// src/app/shared/invoice/invoice-view.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../invoice.service';

@Component({
  standalone:true,
  selector:'app-invoice-view',
  imports:[CommonModule],
  templateUrl:'./invoice-view.component.html'
})
export class InvoiceViewComponent {
  @Input() order:any;

  constructor(private invoice:InvoiceService){}

  downloadPDF(){ this.invoice.generatePDF(this.order); }
  shareWA(){ window.open(this.invoice.generateWhatsAppLink(this.order),'_blank'); }
  printBill(){ this.invoice.printThermal(this.order); }
}
