// src/app/shared/invoice/invoice.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  generatePDF(order: any) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FruitLink Wholesale Invoice", 14, 15);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.orderId}`, 14, 25);
    doc.text(`Date: ${order.date}`, 14, 32);
    doc.text(`Payment: ${order.payment}`, 14, 39);
    doc.text(`Delivery Slot: ${order.slot}`, 14, 46);

    const rows = order.items.map((i:any) => [
      i.name, i.qty + " " + i.unitLabel, `₹${i.pricePerKg}`, `₹${i.lineTotal}`
    ]);

    autoTable(doc,{
      head:[["Product","Qty","Rate","Total"]],
      body: rows,
      startY: 55
    });

    const y = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ₹${order.pricing.subtotal}`,14,y);
    doc.text(`Tax (5%): ₹${order.pricing.tax}`,14,y+7);
    doc.text(`Delivery: ₹${order.pricing.delivery}`,14,y+14);
    doc.text(`Final Total: ₹${order.pricing.total}`,14,y+23);

    doc.save(`invoice-${order.orderId}.pdf`);
  }

  printThermal(order:any){
    window.print(); // thermal layout used in thermal component
  }

  generateWhatsAppLink(order:any){
    const text = `Order ${order.orderId}\nTotal: ₹${order.pricing.total}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }
}
