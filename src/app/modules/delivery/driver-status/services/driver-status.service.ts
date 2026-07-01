import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DriverAvailability } from '../models/driver-availability.enum';
import { DriverStatus } from '../models/driver-status.model';
import { DriverStatusMock } from '../../mock/driver-status.mock';

@Injectable({ providedIn: 'root' })
export class DriverStatusService {

  getDriverStatus(): Observable<DriverStatus> {
    return of(DriverStatusMock.getStatus()).pipe(delay(300));
  }

  updateDriverStatus(
    status: DriverAvailability
  ): Observable<DriverStatus> {

    // simulate failure 5% (enterprise realism)
    if (Math.random() < 0.05) {
      return throwError(() => new Error('Network error'));
    }

    return of(
      DriverStatusMock.updateStatus(status)
    ).pipe(delay(400));
  }
}
