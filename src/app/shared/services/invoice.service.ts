import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({providedIn:'root'})
export class InvoiceService {

  generate(order:any){
    const pdf=new jsPDF();

    pdf.text("Wholesale Invoice", 14, 15);
    pdf.text(`Invoice #: ${order.orderId}`, 14, 25);
    pdf.text(`Date: ${new Date(order.date).toLocaleString()}`, 14, 33);

    autoTable(pdf,{
      startY:40,
      head:[['Item','Qty','Rate','Total']],
      body:order.items.map((i:any)=>[
        i.name,
        i.qty+' '+i.unitLabel,
        '₹'+i.pricePerKg,
        '₹'+i.lineTotal
      ])
    });

    pdf.text(`Subtotal: ₹${order.pricing.subtotal}`,14,pdf.lastAutoTable.finalY+10);
    pdf.text(`Tax: ₹${order.pricing.tax}`,14,pdf.lastAutoTable.finalY+18);
    pdf.text(`Grand Total: ₹${order.pricing.total}`,14,pdf.lastAutoTable.finalY+26);

    pdf.save(`invoice-${order.orderId}.pdf`);
  }
}
