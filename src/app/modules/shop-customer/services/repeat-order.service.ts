import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RepeatOrderService {

  // Mock order history (replace with real API later)
  pastOrders = signal([
    {
      orderId: 'ORD-7001',
      date: '2025-01-20',
      items: [
        { id: 'apple', name: 'Apple', qty: 10, unit: 'kg' },
        { id: 'banana', name: 'Banana', qty: 8, unit: 'kg' },
        { id: 'tomato', name: 'Tomato', qty: 12, unit: 'kg' }
      ]
    },
    {
      orderId: 'ORD-7002',
      date: '2025-01-15',
      items: [
        { id: 'orange', name: 'Orange', qty: 5, unit: 'kg' },
        { id: 'onion', name: 'Onion', qty: 20, unit: 'kg' },
        { id: 'banana', name: 'Banana', qty: 7, unit: 'kg' }
      ]
    }
  ]);

  selectedOrder = signal<any | null>(null);

  selectOrder(order: any) {
    this.selectedOrder.set(order);
  }

  repeatCart = signal<any[]>([]);

  loadOrderIntoCart() {
    const order = this.selectedOrder();
    if (!order) return;
    this.repeatCart.set(order.items.map(item => ({ ...item })));
  }

  updateQty(id: string, delta: number) {
    const cart = this.repeatCart().map(item =>
      item.id === id
        ? { ...item, qty: Math.max(item.qty + delta, 1) }
        : item
    );
    this.repeatCart.set(cart);
  }

  removeItem(id: string) {
    this.repeatCart.set(this.repeatCart().filter(i => i.id !== id));
  }
}
