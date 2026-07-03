import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopManagementService } from '../services/shop-management.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  shopForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopManagementService,
    private router: Router
  ) {
    this.shopForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['Retail', Validators.required],
      status: ['Active', Validators.required],
      ownerName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      creditLimit: [10000, [Validators.required, Validators.min(0)]],
      assignedSalesman: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.shopForm.invalid) {
      this.shopForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.shopForm.value;
    
    // Add currentCredit initialized to 0 for a new shop
    const newShopData = {
      ...formValue,
      currentCredit: 0
    };

    this.shopService.addShop(newShopData).subscribe({
      next: (shop) => {
        this.isSubmitting = false;
        this.router.navigate(['/shop-management/details', shop.id]);
      },
      error: () => {
        this.isSubmitting = false;
        // Handle error here
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/shop-management/list']);
  }
}
