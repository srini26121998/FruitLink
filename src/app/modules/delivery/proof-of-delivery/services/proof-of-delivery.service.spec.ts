import { TestBed } from '@angular/core/testing';

import { ProofOfDeliveryService } from './proof-of-delivery.service';

describe('ProofOfDeliveryService', () => {
  let service: ProofOfDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProofOfDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
