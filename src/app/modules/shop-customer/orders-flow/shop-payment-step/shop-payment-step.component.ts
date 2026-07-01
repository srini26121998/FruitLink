import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';   // Ensure path is correct later

@Component({
  standalone: true,
  selector: 'app-shop-payment-step',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shop-payment-step.component.html'
})
export class ShopPaymentStepComponent {

  private fb = inject(FormBuilder);
  cart = inject(CartService);

  @Output() next = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();

  paymentModes = ['COD', 'UPI', 'Wallet', 'Credit'];              // short clean labels
  outstandingBalance = 12500;                                     // later fetch from Ledger service
  creditAllowedDays = [7, 15, 30, 45, 60];

  form = this.fb.group({
    payment: ['', Validators.required],
    upiId: [''],
    walletNumber: [''],
    creditDays: [''],
  });

  submit() {
    const method = this.form.value.payment;

    // 🔐 strong validation
    if (this.form.invalid) return;

    if (method === 'UPI' && !this.form.value.upiId) {
      alert("Enter UPI ID");
      return;
    }

    if (method === 'Wallet' && !this.form.value.walletNumber) {
      alert("Enter Mobile Wallet Number");
      return;
    }

    if (method === 'Credit' && !this.form.value.creditDays) {
      alert("Select Credit Period");
      return;
    }

    this.next.emit(this.form.value);  // pass data to Confirm step
  }
}
