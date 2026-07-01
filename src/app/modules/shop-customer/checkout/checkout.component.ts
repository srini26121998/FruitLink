import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cart = inject(CartService);

  deliverySlots = ['5AM - 7AM','7AM - 9AM','9AM - 11AM','Evening Slot'];
  paymentModes  = ['Cash on Delivery','UPI','Wallet/Credit'];

  selectedSlot: string | null = null;
  selectedPayment: string | null = null;

  confirmOrder() {
    this.cart.placeOrder(this.selectedSlot!, this.selectedPayment!);
    window.location.href = '/shop/order-summary';
  }
  
goToStep(step:number){
  // you can route or show content based on step
  console.log("Step changed:", step);
}


}
