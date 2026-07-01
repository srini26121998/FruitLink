// =================== Ledger PDF Statement Generator =====================
// npm install jspdf jspdf-autotable

import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LedgerEntry, CustomerLedger } from './ledger.service';

export interface LedgerPayment {
  date: string;
  invoiceId?: string;
  description: string;
  debit?: number;
  credit?: number;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class PdfService {

  // Generate Customer Ledger PDF
  generateStatement(customer: CustomerLedger) {
    const doc = new jsPDF();

    // ==== HEADER ====
    doc.setFontSize(18);
    doc.text('FruitLink Wholesale - Ledger Statement', 14, 15);

    doc.setFontSize(10);
    doc.text(`Customer: ${customer.name}`, 14, 22);
    doc.text(`Shop ID: ${customer.shopId}`, 14, 27);
    doc.text(`Opening Balance: ₹${customer.outstanding}`, 14, 32);

    // Convert ledger entries to PDF table format
    let runningBalance = customer.outstanding;
    const rows = customer.entries.map(entry => {
      runningBalance += entry.type === 'debit' ? entry.amount : -entry.amount;
      return [
        new Date(entry.date).toLocaleDateString(),
        entry.remarks || "-",
        entry.type === 'debit' ? `₹${entry.amount}` : '-',
        entry.type === 'credit' ? `₹${entry.amount}` : '-',
        `₹${runningBalance}`
      ];
    });

    // ==== TABLE ====
    autoTable(doc, {
      head: [['Date', 'Remarks', 'Debit', 'Credit', 'Balance']],
      body: rows,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [76, 175, 80] }, // Green
    });

    // ==== FOOTER ====
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(`No GST applicable for fresh fruits & vegetables`, 14, finalY);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, finalY + 5);

    // SAVE FILE
    doc.save(`Ledger-${customer.name}.pdf`);
  }
}
