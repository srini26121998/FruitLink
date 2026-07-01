import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LedgerService, CustomerLedger } from '../ledger.service';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../pdf.service';

@Component({
  standalone:true,
  selector:'app-ledger-statement',
  imports:[CommonModule],
  templateUrl:'./ledger-statement.component.html'
})
export class LedgerStatementComponent {

  ledger = inject(LedgerService);
  pdf = inject(PdfService);
  route = inject(ActivatedRoute);
  location = inject(Location);

  shopId = this.route.snapshot.paramMap.get('id')!;
  customer: CustomerLedger = this.ledger.getCustomer(this.shopId);

  download() {
    this.pdf.generateStatement(this.customer);
  }

  goBack() {
    this.location.back();
  }
}
