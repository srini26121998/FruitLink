import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class InvoicePrintService {

  generatePDF(order: any) {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("FruitLink Invoice", 14, 15);

    autoTable(doc, {
      head: [['Item', 'Qty', 'Rate', 'Total']],
      body: order.items.map((i:any)=>[
        i.name,
        i.qty + ' ' + i.unitLabel,
        '₹'+i.pricePerKg,
        '₹'+i.lineTotal
      ]),
      startY: 30
    });

    doc.save(`Invoice-${order.orderId}.pdf`);
  }

  // 🔥 Fix: Wrapper for component usage
  generate(order: any) {
    this.generatePDF(order);
  }
}
