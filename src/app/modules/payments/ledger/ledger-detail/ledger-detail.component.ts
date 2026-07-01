import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { LedgerService, LedgerEntry } from '../ledger.service';

@Component({
  standalone: true,
  selector: 'app-ledger-detail',
  imports: [CommonModule,RouterLink],
  templateUrl: './ledger-detail.component.html'
})
export class LedgerDetailComponent {

  route = inject(ActivatedRoute);
  router = inject(Router);
  ledgerService = inject(LedgerService);
  location = inject(Location);

  shopId = this.route.snapshot.paramMap.get('id') ?? '';
  data = this.ledgerService.getCustomer(this.shopId);

  get entries(): LedgerEntry[] {
    return this.data?.entries ?? [];
  }

  get balance(): number {
    return this.data?.outstanding ?? 0;
  }

  goSettlement() {
    this.router.navigate(['payments/ledger/settlement', this.shopId]);
  }

  goBack() {
    this.location.back();
  }
}
