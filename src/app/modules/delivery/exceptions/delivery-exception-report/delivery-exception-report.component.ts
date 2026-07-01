import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryStatus } from '../../models/delivery-status.enum';
import { OrderDeliverySyncService } from '../../../orders/services/order-delivery-sync.service';
import { DeliveryExceptionService } from '../services/delivery-exception.service';
import { DeliveryExceptionReason } from '../models/delivery-exception-reason.enum';

@Component({
  selector: 'app-delivery-exception-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-exception-report.component.html'
})
export class DeliveryExceptionReportComponent {

  /** passed from route / parent */
  @Input({ required: true }) orderId!: string;
  @Input({ required: true }) driverId!: string;


  notes = signal<string>('');
  reason = signal<DeliveryExceptionReason | null>(null);

  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  constructor(
    private exceptionService: DeliveryExceptionService,
    private orderDeliverySync: OrderDeliverySyncService
  ) { }

  submitException(): void {
    if (!this.reason()) {
      this.error.set('Please select an exception reason');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.exceptionService.reportException({
      orderId: this.orderId,
      driverId: this.driverId,
      reason: this.reason()!,
      notes: this.notes(),
      reportedAt: new Date().toISOString()
    }).subscribe({
      next: () => {

        // 🔑 CRITICAL: freeze order
        this.orderDeliverySync
          .syncOrderWithDelivery(
            this.orderId,
            DeliveryStatus.DELIVERY_EXCEPTION
          )
          .subscribe();

        this.loading.set(false);
        this.success.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to report exception');
      }
    });
  }
}
