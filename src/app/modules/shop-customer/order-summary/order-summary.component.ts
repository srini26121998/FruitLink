import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { InvoicePrintService } from '../services/invoice-print.service';   // <-- Add Import

import { PdfService } from '../../payments/pdf/pdf.service';
// Interface OUTSIDE the class
export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  pricePerKg: number;
  unit: string;
  lineTotal: number;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent {

  cart = inject(CartService);
  invoice = inject(InvoicePrintService);   // <-- FIX (property created)
  
  order = this.cart.lastOrder();      // retrieved last placed order

  get totalQty(): number {
    return this.order?.items?.reduce((t: number, i: OrderItem) => t + i.qty, 0) ?? 0;
  }

  downloadInvoice(){
    if(!this.order){
      alert("No order found");
      return;
    }
    this.invoice.generate(this.order);    // <-- NOW WORKS
  }
}
