import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProofOfDelivery } from '../models/proof-of-delivery.model';
import { ProofOfDeliveryMock } from '../../mock/proof-of-delivery.mock';

@Injectable({ providedIn: 'root' })
export class ProofOfDeliveryService {

  uploadProof(
    proof: ProofOfDelivery
  ): Observable<ProofOfDelivery> {
    return of(
      ProofOfDeliveryMock.save(proof)
    ).pipe(delay(600));
  }

  getProof(orderId: string): Observable<ProofOfDelivery | null> {
    return of(
      ProofOfDeliveryMock.getByOrder(orderId)
    ).pipe(delay(400));
  }
}
