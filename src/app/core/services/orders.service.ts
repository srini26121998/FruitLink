import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { OrderCartService } from './order-cart.service';
import { ShopsService } from './shops.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  constructor(
    private cart: OrderCartService,
    private shops: ShopsService
  ) {}

  // Create bulk orders
  bulkCreate() {
    const entries = this.cart.getAllEntries();
    const date = this.shops.deliveryDate();

    const payload = entries.map(e => ({
      shopId: e.shopId,
      deliveryDate: date,
      items: e.items,
      total: e.items.reduce((a: number, b: any) => a + b.total, 0)
    }));

    // MOCK API RESPONSE
    const mock = payload.map((p, i) => ({
      orderId: "ORD-" + (1000 + i),
      ...p
    }));

    return of(mock).pipe(delay(1500));
  }
}
