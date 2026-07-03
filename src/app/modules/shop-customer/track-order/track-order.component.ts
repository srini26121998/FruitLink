import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackingService } from '../services/tracking.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './track-order.component.html'
})
export class TrackOrderComponent implements OnInit, OnDestroy {
  tracking = inject(TrackingService);

  orderId = 'ORD-123456'; 

  statusFlow = this.tracking.statuses;
  current = this.tracking.currentStatus;
  
  refreshInterval: any;

  refresh() {
    this.tracking.getOrderStatus(this.orderId).subscribe();
  }

  ngOnInit() {
    this.refreshInterval = setInterval(() => this.refresh(), 5000); 
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  getMockTime(index: number): string {
    const times = ['10:00 AM', '10:15 AM', '11:30 AM', '1:45 PM', '2:30 PM'];
    if (this.current() >= index) {
      return times[index];
    }
    return 'Pending';
  }

  getMockMessage(status: string): string {
    const messages: Record<string, string> = {
      'Order Placed': 'Your order has been placed successfully and is pending confirmation.',
      'Approved': 'Order has been approved by the store and sent for packing.',
      'Packed': 'Items are packed and ready for dispatch.',
      'Out for Delivery': 'Your order is out for delivery with our delivery partner.',
      'Delivered': 'Order has been delivered successfully. Enjoy!'
    };
    return messages[status] || `Order reached ${status} stage.`;
  }
}
