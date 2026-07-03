import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export function identifierValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isMobile = /^\d{10}$/.test(value);

    return (isEmail || isMobile) ? null : { invalidIdentifier: true };
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    // use email or mobile depending on your backend: keep both fields for example
    identifier: ['', [Validators.required, identifierValidator()]], // phone or email
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  error = '';

  // --- Real (mocked) login for development
  async submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    try {
      const val = this.form.value;

      // In prod you'd call API -> get user & token -> auth.login(user)
      // For now we use mock method login() to accept any values and create a user.
      // Use admin by default for dev, or implement server auth.
      this.auth.loginAsAdmin(); // or this.auth.loginMock() if you prefer
      // Ensure RBAC is synced inside AuthService (our fixed AuthService does this)

      // Redirect based on role
      const user = this.auth.currentUser();
      if (!user) {
        this.error = 'Login failed — no user returned';
        return;
      }

      this.navigateByRole(user.role);
    } catch (err: any) {
      this.error = err?.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }

  /** Navigate to appropriate dashboard based on role */
  private navigateByRole(role: string) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'shop_manager':
        this.router.navigate(['/shop-portal/dashboard']);
        break;
      case 'branch_manager':
        this.router.navigate(['/shop-portal/dashboard']);
        break;
      case 'delivery':
        this.router.navigate(['/delivery/gps-tracking']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  // --- Quick role switcher buttons for dev testing
  loginAsAdmin() {
    this.auth.loginAsAdmin();
    this.navigateByRole('admin');
  }

  loginAsShopManager() {
    this.auth.loginAsShopManager();
    this.navigateByRole('shop_manager');
  }

  loginAsBranchManager() {
    this.auth.loginAsBranchManager();
    this.navigateByRole('branch_manager');
  }

  loginAsDelivery() {
    this.auth.loginAsDelivery();
    this.navigateByRole('delivery');
  }
}
