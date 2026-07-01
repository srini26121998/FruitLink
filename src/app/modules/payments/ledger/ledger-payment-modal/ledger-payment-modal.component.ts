import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ledger-payment-modal',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl:'./ledger-payment-modal.component.html'
})
export class LedgerPaymentModalComponent {

  private fb = inject(FormBuilder);

  @Input() invoiceId: string = '';
  @Input() outstanding: number = 0;

  @Output() close = new EventEmitter();
  @Output() paymentAdded = new EventEmitter<any>();

  form = this.fb.group({
    amount:['',Validators.required],
    method:['Cash',Validators.required],
    note:['']
  });

  submit(){
    if(this.form.invalid) return;

    const data = {
      invoiceId:this.invoiceId,
      ...this.form.value,
      date:new Date()
    };

    this.paymentAdded.emit(data);
    this.close.emit();
  }
}
