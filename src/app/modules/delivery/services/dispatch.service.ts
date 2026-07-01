import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DeliveryOrder } from '../models/delivery-order.model';
import { DeliveryStatus } from '../models/delivery-status.enum';
import { Driver } from '../exceptions/models/driver.model';

import { DeliveryOrdersMock } from '../mock/delivery-orders.mock';
import { DriversMock } from '../mock/drivers.mock';

@Injectable({ providedIn: 'root' })
export class DispatchService {

  getPendingOrders(): Observable<DeliveryOrder[]> {
    return of(
      DeliveryOrdersMock.getDispatchPendingOrders()
    ).pipe(delay(400));
  }

  getAvailableDrivers(): Observable<Driver[]> {
    return of(
      DriversMock.getAvailableDrivers()
    ).pipe(delay(300));
  }

  dispatchOrder(
    order: DeliveryOrder,
    driver: Driver
  ): Observable<DeliveryOrder> {

    // simulate failure (enterprise reality)
    if (Math.random() < 0.05) {
      return throwError(() => new Error('Dispatch failed'));
    }

    return of({
      ...order,
      status: DeliveryStatus.DISPATCHED,
      driverId: driver.driverId,
      dispatchedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }).pipe(delay(500));
  }
}
