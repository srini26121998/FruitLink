import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  currentStep: number = 1;
  identifierForm!: FormGroup;
  otpForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.identifierForm = this.fb.group({
      identifier: ['', [Validators.required, this.identifierValidator]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4,6}$')]]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  identifierValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobileRegex = /^[0-9]{10}$/;
    
    if (emailRegex.test(value) || mobileRegex.test(value)) {
      return null;
    }
    return { invalidIdentifier: true };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notMatching: true };
  }

  onSendOtp() {
    if (this.identifierForm.valid) {
      // API call to send OTP would go here
      console.log('Sending OTP to', this.identifierForm.value.identifier);
      this.currentStep = 2;
    } else {
      this.identifierForm.markAllAsTouched();
    }
  }

  onVerifyOtp() {
    if (this.otpForm.valid) {
      // API call to verify OTP would go here
      console.log('Verifying OTP', this.otpForm.value.otp);
      this.currentStep = 3;
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      // API call to reset password would go here
      console.log('Resetting password', this.resetPasswordForm.value);
      // On success, navigate to login
      alert('Password reset successfully!');
      this.router.navigate(['/auth/login']);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
