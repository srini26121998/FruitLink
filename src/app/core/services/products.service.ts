import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private list = signal<any[]>([]);

  constructor() {}

  loadProducts() {
    const mock = [
      { id: 'p1', name: 'Apple', price: 120 },
      { id: 'p2', name: 'Banana', price: 40 },
      { id: 'p3', name: 'Orange', price: 90 },
      { id: 'p4', name: 'Tomato', price: 60 },
      { id: 'p5', name: 'Potato', price: 30 },
    ];

    return of(mock).pipe(delay(300)).subscribe(res => {
      this.list.set(res);
    });
  }

  get products() {
    return this.list();
  }
}
