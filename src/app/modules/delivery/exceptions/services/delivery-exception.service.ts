import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DeliveryException } from '../models/delivery-exception.model';
import { DeliveryExceptionsMock } from '../../mock/delivery-exceptions.mock';

@Injectable({ providedIn: 'root' })
export class DeliveryExceptionService {

  getExceptions(): Observable<DeliveryException[]> {
    return of(
      DeliveryExceptionsMock.getAll()
    ).pipe(delay(400));
  }

  reportException(
    exception: DeliveryException
  ): Observable<DeliveryException> {
    return of(
      DeliveryExceptionsMock.report(exception)
    ).pipe(delay(500));
  }
}
