import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LedgerService } from '../ledger.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone:true,
  selector:'app-ledger-settlement',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl:'./ledger-settlement.component.html'
})
export class LedgerSettlementComponent {

  ledger = inject(LedgerService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  location = inject(Location);

  shopId = this.route.snapshot.paramMap.get('id')!;
  outstanding = this.ledger.getOutstanding(this.shopId);

  form = this.fb.group({
    amount:[0,[Validators.required,Validators.min(1)]],
    remarks:['Payment Received']
  });

  submit(){
    if(!this.form.valid) return;
    this.ledger.addPayment(this.shopId,this.form.value.amount!,this.form.value.remarks!);
    this.router.navigate(['/payments/ledger/detail',this.shopId])
  }

  goBack() {
    this.location.back();
  }
}
