import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopProductsService {

  products = signal<any[]>([]);

  loadProducts() {
    const mock = [
      { id: 'p1', name: 'Apple', price: 120, image: '/assets/fruits/apple.png' },
      { id: 'p2', name: 'Banana', price: 40, image: '/assets/fruits/banana.png' },
      { id: 'p3', name: 'Orange', price: 90, image: '/assets/fruits/orange.png' },
      { id: 'p4', name: 'Tomato', price: 60, image: '/assets/fruits/tomato.png' },
      { id: 'p5', name: 'Potato', price: 30, image: '/assets/fruits/potato.png' },
    ];

    of(mock).pipe(delay(300)).subscribe(res => {
      this.products.set(res);
    });
  }
}
