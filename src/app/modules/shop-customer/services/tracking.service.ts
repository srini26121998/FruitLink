import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrackingService {

  // Status flow
  statuses = [
    'Order Placed',
    'Approved',
    'Packed',
    'Out for Delivery',
    'Delivered'
  ];

  // Mock live tracking state
  currentStatus = signal(0);  // 0 = Order Placed

  // Simulated backend call
  getOrderStatus(orderId: string) {
    return of({
      orderId,
      statusIndex: this.currentStatus()
    }).pipe(delay(500));
  }

  // Move to next status (Admin controls this in real app)
  mockAdvanceStatus() {
    if (this.currentStatus() < 4) {
      this.currentStatus.set(this.currentStatus() + 1);
    }
  }
}
