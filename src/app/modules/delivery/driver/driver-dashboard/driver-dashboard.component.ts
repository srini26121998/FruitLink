import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DeliveryService } from '../../services/delivery.service';
import { DeliveryOrder } from '../../models/delivery-order.model';
import { DeliveryStatus } from '../../models/delivery-status.enum';

import { DriverStatusPanelComponent } from '../../driver-status/driver-status-panel/driver-status-panel.component';

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule, DriverStatusPanelComponent],
  templateUrl: './driver-dashboard.component.html'
})
export class DriverDashboardComponent implements OnInit {

  orders = signal<DeliveryOrder[]>([]);
  loading = signal(true);

  readonly statuses = DeliveryStatus;

  assignedCount = computed(() => this.orders().length);

  activeCount = computed(() =>
    this.orders().filter(o =>
      o.status === DeliveryStatus.OUT_FOR_DELIVERY
    ).length
  );

  completedCount = computed(() =>
    this.orders().filter(o =>
      o.status === DeliveryStatus.DELIVERED
    ).length
  );

  private router = inject(Router);

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDriverTodayOrders().subscribe(res => {
      this.orders.set(res);
      this.loading.set(false);
    });
  }

  trackByOrder(_: number, order: DeliveryOrder) {
    return order.orderId;
  }

  viewDetails(order: DeliveryOrder) {
    this.router.navigate(['/delivery/order-details', order.orderId]);
  }
}
