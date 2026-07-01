import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DeliveryOrder } from '../models/delivery-order.model';
import { DeliveryOrdersMock } from '../mock/delivery-orders.mock';

@Injectable({ providedIn: 'root' })
export class DeliveryService {

  getDriverTodayOrders(): Observable<DeliveryOrder[]> {
    return of(
      DeliveryOrdersMock.getDriverTodayOrders()
    ).pipe(delay(400));
  }
}
