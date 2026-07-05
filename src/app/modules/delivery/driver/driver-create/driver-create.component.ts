import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-create.component.html'
})
export class DriverCreateComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  driverForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.driverForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      vehicleNumber: ['', [Validators.required, Validators.minLength(4)]],
      status: ['Active', Validators.required]
    });
  }

  onSubmit() {
    if (this.driverForm.invalid) {
      this.driverForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/delivery/driver-dashboard']);
    }, 1000);
  }

  cancel() {
    this.router.navigate(['/delivery/driver-dashboard']);
  }
}
