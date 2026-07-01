import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector:'app-shop-confirm-step',
  imports:[CommonModule],
  templateUrl:'./shop-confirm-step.component.html'
})
export class ShopConfirmStepComponent {

  @Input() fullData:any;                // {delivery:{address,slot}, payment:{payment,...}}
  
  cart = inject(CartService);
  router = inject(Router);

  get paymentType(){
    return this.fullData?.payment?.payment ?? 'Not Selected';
  }

  get deliverySlot(){
    return this.fullData?.delivery?.slot ?? 'Not Selected';
  }

  get address(){
    return this.fullData?.delivery?.address ?? '-';
  }

 placeOrder() {
  const order = {
    items: this.cart.cart(),
    orderId: "ORD-" + Date.now(),
    date: new Date().toISOString(),
    payment: this.paymentType,
    slot: this.deliverySlot,
    pricing: this.cart.pricing
  };

  this.cart.lastOrder.set(order);  // save to signal
  localStorage.setItem('lastOrder', JSON.stringify(order)); // store persistently

  this.cart.clearCart();
  this.router.navigate(['/shop/invoice']);
}

}
