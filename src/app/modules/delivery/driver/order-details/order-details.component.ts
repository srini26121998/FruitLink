import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { DeliveryService } from '../../services/delivery.service';
import { DeliveryOrder } from '../../models/delivery-order.model';
import { DeliveryStatus } from '../../models/delivery-status.enum';

@Component({
  selector: 'app-driver-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html'
})
export class DriverOrderDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private deliveryService = inject(DeliveryService);

  readonly statuses = DeliveryStatus;

  order: DeliveryOrder | null = null;
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading = false;
      return;
    }

    this.deliveryService.getDriverTodayOrders().subscribe({
      next: (orders: DeliveryOrder[]) => {
        this.order =
          orders.find(o => o.orderId === id) ?? null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  /** UI-level status update (API later) */
  updateStatus(status: DeliveryStatus): void {
    if (!this.order) return;

    this.order = {
      ...this.order,
      status
    };

    // 🔌 later:
    // call delivery service + OrderDeliverySyncService
  }
}
