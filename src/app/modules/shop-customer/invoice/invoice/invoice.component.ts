import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { InvoicePrintService } from '../../services/invoice-print.service';
import { LedgerPaymentModalComponent } from "../../../payments/ledger/ledger-payment-modal/ledger-payment-modal.component";

@Component({
  standalone: true,
  selector: 'app-shop-invoice',
  imports: [CommonModule, LedgerPaymentModalComponent],
  templateUrl: './invoice.component.html'
})
export class ShopInvoiceComponent implements OnInit {

  cart = inject(CartService);
  printService = inject(InvoicePrintService);
  router = inject(Router);

  order: any;

  ngOnInit() {
    this.order = this.cart.lastOrder();

    // 🛡 SAFETY CHECK – If user refreshes invoice page
    if (!this.order) {
      alert("No invoice found. Please place an order first.");
      this.router.navigate(['/shop/orders-flow']);
      return;
    }
  }

  get items() {
    return this.order?.items ?? [];
  }

  get totalQty() {
    return this.items.reduce((t: number, i: any) => t + (i.qty ?? 0), 0);
  }

  // 🖨 Web Print (A4 layout applied)
  printInvoice() {
    window.print();
  }

  // 📄 PDF Download
  downloadPDF() {
    this.printService.generatePDF(this.order);
  }

  // ➕ Create New Order
  newOrder() {
    this.cart.clearCart();
    this.router.navigate(['/shop/orders-flow']);
  }
  showModal=false;

openPaymentModal(){
  this.showModal=true;
}

savePayment(paymentData:any){
  console.log("📌 PAYMENT ADDED:",paymentData);
  alert("Payment recorded successfully!");
}

}
