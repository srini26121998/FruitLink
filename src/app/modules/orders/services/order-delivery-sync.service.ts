import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { OrderStatus } from './../../../core/models/order-status.enum';
import { DeliveryStatus } from '../../delivery/models/delivery-status.enum';

/**
 * Central authority for Order ↔ Delivery state sync
 * Enterprise rule: Order is source of truth
 */
@Injectable({ providedIn: 'root' })
export class OrderDeliverySyncService {

  constructor() {}

  /**
   * Entry point – call this whenever delivery status changes
   */
  syncOrderWithDelivery(
    orderId: string,
    deliveryStatus: DeliveryStatus
  ): Observable<OrderStatus> {

    const nextOrderStatus =
      this.mapDeliveryToOrderStatus(deliveryStatus);

    if (!nextOrderStatus) {
      return throwError(() =>
        new Error('Invalid delivery → order transition')
      );
    }

    // 🔌 Replace this with real API call later
    return this.updateOrderStatus(orderId, nextOrderStatus);
  }

  /**
   * Business rule mapping (DO NOT duplicate elsewhere)
   */
 private mapDeliveryToOrderStatus(
  deliveryStatus: DeliveryStatus
): OrderStatus | null {

  switch (deliveryStatus) {

    case DeliveryStatus.CREATED:
    case DeliveryStatus.APPROVED:
    case DeliveryStatus.PACKED:
      return OrderStatus.PACKED;

    case DeliveryStatus.DISPATCHED:
    case DeliveryStatus.OUT_FOR_DELIVERY:
      return OrderStatus.IN_TRANSIT;

    case DeliveryStatus.DELIVERY_EXCEPTION:
      return OrderStatus.ON_HOLD;

    case DeliveryStatus.DELIVERED:
      return OrderStatus.COMPLETED;

    default:
      return null;
  }
}


  /**
   * Mock implementation (API-ready)
   */
  private updateOrderStatus(
    orderId: string,
    status: OrderStatus
  ): Observable<OrderStatus> {

    console.log(
      `[SYNC] Order ${orderId} → ${status}`
    );

    // later:
    // return this.http.patch(`/orders/${orderId}/status`, { status })

    return of(status).pipe(delay(300));
  }
}
