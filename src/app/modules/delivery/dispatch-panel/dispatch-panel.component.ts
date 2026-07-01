import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryOrder } from '../models/delivery-order.model';
import { DeliveryStatus } from '../models/delivery-status.enum';
import { Driver } from '../exceptions/models/driver.model';

import { DispatchService } from '../services/dispatch.service';
import { OrderDeliverySyncService } from '../../orders/services/order-delivery-sync.service';

@Component({
  selector: 'app-dispatch-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dispatch-panel.component.html'
})
export class DispatchPanelComponent implements OnInit {

  // expose enum to template
  readonly statuses = DeliveryStatus;

  // state
  orders = signal<DeliveryOrder[]>([]);
  drivers = signal<Driver[]>([]);

  // orderId → selected driver
  selectedDriver = signal<Record<string, Driver | null>>({});

  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private dispatchService: DispatchService,
    private orderDeliverySync: OrderDeliverySyncService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);
    this.error.set(null);

    this.dispatchService.getPendingOrders().subscribe({
      next: orders => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load orders');
        this.loading.set(false);
      }
    });

    this.dispatchService.getAvailableDrivers().subscribe({
      next: drivers => this.drivers.set(drivers),
      error: () => this.error.set('Failed to load drivers')
    });
  }

  // driver selection
  onDriverChange(orderId: string, driverId: string): void {
    const driver =
      this.drivers().find(d => d.driverId === driverId) ?? null;

    this.selectedDriver.update(map => ({
      ...map,
      [orderId]: driver
    }));
  }

  // 🚚 DISPATCH (SINGLE SOURCE OF TRUTH)
  dispatch(order: DeliveryOrder): void {
    const driver = this.selectedDriver()[order.orderId];

    if (!driver) {
      this.error.set('Please select a driver');
      return;
    }

    const previousStatus = order.status;

    // optimistic UI update
    order.status = DeliveryStatus.DISPATCHED;

    this.dispatchService.dispatchOrder(order, driver).subscribe({
      next: updatedDelivery => {

        // update delivery list
        this.orders.update(list =>
          list.map(o =>
            o.orderId === updatedDelivery.orderId
              ? updatedDelivery
              : o
          )
        );

        // 🔑 SYNC ORDER STATUS (CRITICAL)
        this.orderDeliverySync
          .syncOrderWithDelivery(
            updatedDelivery.orderId,
            updatedDelivery.status
          )
          .subscribe();
      },
      error: () => {
        // rollback on failure
        order.status = previousStatus;
        this.error.set('Dispatch failed. Please retry.');
      }
    });
  }
}
