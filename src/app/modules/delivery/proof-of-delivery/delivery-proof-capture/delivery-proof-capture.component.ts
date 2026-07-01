import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProofOfDeliveryService } from '../services/proof-of-delivery.service';
import { OrderDeliverySyncService } from '../../../orders/services/order-delivery-sync.service';
import { DeliveryStatus } from '../../models/delivery-status.enum';

@Component({
  selector: 'app-delivery-proof-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-proof-capture.component.html'
})
export class DeliveryProofCaptureComponent {

  /** Passed from parent / route */
  @Input({ required: true }) orderId!: string;
  @Input({ required: true }) driverId!: string;

  photoPreview = signal<string | null>(null);
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);

  constructor(
    private podService: ProofOfDeliveryService,
    private orderDeliverySync: OrderDeliverySyncService
  ) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      this.photoPreview.set(reader.result as string);

    reader.readAsDataURL(file);
  }

  submit(): void {
    if (!this.photoPreview()) {
      this.error.set('Please upload delivery proof');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.podService.uploadProof({
      orderId: this.orderId,
      driverId: this.driverId,
      photoUrl: this.photoPreview()!,
      deliveredAt: new Date().toISOString(),
      latitude: 13.0827,   // mock
      longitude: 80.2707   // mock
    }).subscribe({
      next: () => {

        // 🔑 CRITICAL: Sync Order with Delivery
        this.orderDeliverySync
          .syncOrderWithDelivery(
            this.orderId,
            DeliveryStatus.DELIVERED
          )
          .subscribe();

        this.loading.set(false);
        this.success.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Proof upload failed. Please retry.');
      }
    });
  }
}
