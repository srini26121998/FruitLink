import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopProductsService } from '../services/shop-products.service';
import { ShopCartService } from '../services/shop-cart.service';

@Component({
  standalone: true,
  selector: 'app-shop-fruits',
  imports: [CommonModule],
  templateUrl: './fruits.component.html'
})
export class FruitsComponent implements OnInit {

  productsService = inject(ShopProductsService);
  cart = inject(ShopCartService);

  ngOnInit() {
    this.productsService.loadProducts();
  }
}
