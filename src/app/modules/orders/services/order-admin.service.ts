import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderAdminService {

  orders = signal<any[]>([
    {
      id: 'ORD-101',
      shop: 'Anna Fruit Store',
      slot: '5AM - 7AM',
      qty: 48,
      status: 0, // 0=Placed
      createdAt: '2025-02-11T05:10:00',
    },
    {
      id: 'ORD-102',
      shop: 'Fresh Mart',
      qty: 32,
      slot: '7AM - 9AM',
      status: 1, // 1=Approved
      createdAt: '2025-02-11T06:00:00',
    },
    {
      id: 'O101',
      date: '2025-02-02',
      status: 2,
      items: [
        { id: 'p1', name: 'Apple', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 120, lineTotal: 600 }
      ],
      discount: 50,
    }

  ]);

  statuses = [
    'Order Placed',
    'Approved',
    'Packed',
    'Driver Assigned',
    'Out for Delivery',
    'Delivered'
  ];

  updateOrderStatus(orderId: string, step: number) {
    this.orders.set(
      this.orders().map(o =>
        o.id === orderId ? { ...o, status: step } : o
      )
    );
  }

  mockAssignDriver(orderId: string, driver: string) {
    this.updateOrderStatus(orderId, 3);
  }

  fetchOrders() {
    return of(this.orders()).pipe(delay(600));
  }
  getOrderById(orderId: string) {
    const found = this.orders().find(o => o.id === orderId);
    if (found) return found;

    // Fallback mock data to ensure UI displays correctly for any prototype ID (e.g. #ORD1201)
    return {
      id: orderId,
      shop: 'Juice Hub (Mock)',
      date: new Date().toISOString().split('T')[0],
      status: 0,
      items: [
        { id: 'p1', name: 'Fresh Apples (Premium)', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 120, lineTotal: 1200 },
        { id: 'p2', name: 'Alphonso Mangoes', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 200, lineTotal: 1000 },
        { id: 'p3', name: 'Organic Bananas', qty: 2, unitLabel: 'bunch', qtyKg: 4, pricePerKg: 60, lineTotal: 240 }
      ],
      discount: 140
    };
  }

  getOrderLogs(orderId: string) {
    return [
      { text: 'Order Placed', by: 'Shop Owner', time: '2025-02-11 06:00 AM' },
      { text: 'Approved by Admin', by: 'Super Admin', time: '2025-02-11 06:10 AM' },
      { text: 'Packed in Warehouse', by: 'Packer #3', time: '2025-02-11 07:00 AM' },
      { text: 'Driver Assigned', by: 'Dispatch Team', time: '2025-02-11 07:15 AM' },
    ];
  }

}
