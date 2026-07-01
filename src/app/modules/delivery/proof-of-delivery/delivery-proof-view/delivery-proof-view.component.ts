import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProofOfDelivery } from '../models/proof-of-delivery.model';
import { ProofOfDeliveryService } from '../services/proof-of-delivery.service';

@Component({
  selector: 'app-delivery-proof-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-proof-view.component.html'
})
export class DeliveryProofViewComponent implements OnInit {

  proof = signal<ProofOfDelivery | null>(null);
  loading = signal(true);

  constructor(private service: ProofOfDeliveryService) {}

  ngOnInit(): void {
    this.service.getProof('ORD101').subscribe(res => {
      this.proof.set(res);
      this.loading.set(false);
    });
  }
}
