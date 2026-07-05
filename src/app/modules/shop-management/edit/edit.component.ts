import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopManagementService, Shop } from '../services/shop-management.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  shopForm: FormGroup;
  isSubmitting: boolean = false;
  shopId: string | null = null;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopManagementService,
    private router: Router,
    private route: ActivatedRoute
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
      assignedSalesman: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.shopId = params.get('id');
      if (this.shopId) {
        this.fetchShopDetails(this.shopId);
      }
    });
  }

  fetchShopDetails(id: string): void {
    this.loading = true;
    this.shopService.getShopById(id).subscribe(data => {
      if (data) {
        this.shopForm.patchValue({
          name: data.name,
          type: data.type,
          status: data.status,
          ownerName: data.ownerName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          creditLimit: data.creditLimit,
          assignedSalesman: data.assignedSalesman,
          username: data.username || '',
          password: data.password || ''
        });
      }
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.shopForm.invalid || !this.shopId) {
      this.shopForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.shopForm.value;

    this.shopService.updateShop(this.shopId, formValue).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/shop-management/details', this.shopId]);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    if (this.shopId) {
      this.router.navigate(['/shop-management/details', this.shopId]);
    } else {
      this.router.navigate(['/shop-management/list']);
    }
  }
}
