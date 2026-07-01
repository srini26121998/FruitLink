import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDeliverySyncService } from '../../../orders/services/order-delivery-sync.service';
import { DeliveryStatus } from '../../models/delivery-status.enum';

@Component({
  standalone: true,
  selector: 'app-driver-order-progress',
  imports: [CommonModule],
  template: `
    <div class="p-4 space-y-6">

      <h2 class="text-xl font-semibold">
        Order Progress
      </h2>

      <ul class="space-y-4">

        <li class="flex gap-3 items-center">
          <span class="w-4 h-4 bg-green-600 rounded-full"></span>
          <p class="font-medium">Picked Up</p>
        </li>

        <li class="flex gap-3 items-center">
          <span class="w-4 h-4 bg-blue-600 rounded-full"></span>
          <p class="font-medium">On the Way</p>
        </li>

        <li class="flex gap-3 items-center">
          <span class="w-4 h-4 bg-gray-400 rounded-full"></span>
          <p class="font-medium">Delivered</p>
        </li>

      </ul>

      <!-- Explicit driver action -->
      <button
        class="w-full py-2 rounded text-white
               bg-[var(--primary-color)]"
        (click)="markDelivered()">

        Confirm Delivery

      </button>

    </div>
  `
})
export class DriverOrderProgressComponent {

  /** Order ID passed from parent / route */
  @Input({ required: true })
  orderId!: string;

  constructor(
    private orderDeliverySync: OrderDeliverySyncService
  ) {}

  markDelivered(): void {
    this.orderDeliverySync
      .syncOrderWithDelivery(
        this.orderId,
        DeliveryStatus.DELIVERED
      )
      .subscribe();
  }
}
