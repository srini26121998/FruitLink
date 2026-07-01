import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  cart = inject(CartService);
  Math = Math;

  get totalKg() {
    return this.cart.cart().reduce((sum,item)=> sum + item.qtyKg , 0);
  }
}
