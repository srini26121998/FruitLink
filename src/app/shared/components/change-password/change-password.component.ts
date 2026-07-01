import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder);

  // build form with validators
  form = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatchValidator });

  loading = false;
  successMessage = '';
  errorMessage = '';

  // custom validator to ensure new & confirm match
  private passwordsMatchValidator(group: any) {
    const newPwd = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return newPwd === confirm ? null : { passwordsMismatch: true };
  }

  // convenience getters for template
  get currentPassword() { return this.form.get('currentPassword'); }
  get newPassword() { return this.form.get('newPassword'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      currentPassword: this.currentPassword?.value,
      newPassword: this.newPassword?.value
    };

    this.loading = true;

    // TODO: Replace following mock behaviour with real API call (e.g. AuthService.changePassword(payload))
    // Example: this.authService.changePassword(payload).subscribe(...)

    // Mock response
    setTimeout(() => {
      this.loading = false;
      // mock success: check currentPassword for demo
      if (payload.currentPassword === 'wrong') {
        this.errorMessage = 'Current password is incorrect.';
      } else {
        this.successMessage = 'Password changed successfully.';
        this.form.reset();
      }
    }, 800);
  }
}
