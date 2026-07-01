import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  OpsDashboardMock,
  OpsDashboardSnapshot
} from '../mock/ops-dashboard.mock';

@Injectable({ providedIn: 'root' })
export class OpsDashboardService {

  getLiveSnapshot(): Observable<OpsDashboardSnapshot> {
    // later → replace with HTTP call
    return of(
      OpsDashboardMock.getSnapshot()
    ).pipe(delay(400));
  }
}
