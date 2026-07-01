import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector:'app-shop-cart-step',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./shop-cart-step.component.html'
})
export class ShopCartStepComponent {
  cart = inject(CartService);
  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();

  update(i:any){ this.cart.updateQty(i.id,i.unitId,i.qty); }
  remove(i:any){ this.cart.removeItem(i.id,i.unitId); }
}
