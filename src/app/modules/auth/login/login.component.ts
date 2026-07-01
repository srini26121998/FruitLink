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

      if (user.role === 'admin') {
        await this.router.navigate(['/admin/dashboard']);
      } else if (user.role === 'shop') {
        await this.router.navigate(['/shop/dashboard']);
      } else if (user.role === 'delivery') {
        await this.router.navigate(['/delivery/gps-tracking']);
      } else {
        await this.router.navigate(['/']); // fallback
      }
    } catch (err: any) {
      this.error = err?.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }

  // --- Optional quick role switcher buttons for dev testing
  loginAsAdmin() {
    this.auth.loginAsAdmin();
    this.router.navigate(['/admin/dashboard']);
  }
  loginAsShop() {
    this.auth.loginAsShop();
    this.router.navigate(['/shop/dashboard']);
  }
  loginAsDelivery() {
    this.auth.loginAsDelivery();
    this.router.navigate(['/delivery/gps-tracking']);
  }
}
