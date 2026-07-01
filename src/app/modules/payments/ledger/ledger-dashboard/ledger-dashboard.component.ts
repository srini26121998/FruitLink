import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LedgerService } from '../ledger.service';

@Component({
  standalone: true,
  selector: 'app-ledger-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './ledger-dashboard.component.html'
})
export class LedgerDashboardComponent {

  ledger = inject(LedgerService);
  router = inject(Router);

  // 🔎 Filters
  searchTerm = '';
  minOutstanding: number | null = null;

  // ====== Aggregated Metrics ======

  get totalDebit(): number {
    return this.ledger.totalDebitAmount();
  }

  get totalCredit(): number {
    return this.ledger.totalCreditAmount();
  }

  get totalOutstanding(): number {
    return this.ledger.totalOutstanding();
  }

  get shopsInCreditCount(): number {
    return this.filteredShops.length;
  }

  get recoveryRate(): number {
    return this.ledger.recoveryRate();
  }

  // Raw shop summary
  get shops() {
    return this.ledger.outstandingByShop();
  }

  // Filtered shops for table
  get filteredShops() {
    let list = this.shops;

    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(t) ||
        s.shopId.toLowerCase().includes(t)
      );
    }

    if (this.minOutstanding != null && this.minOutstanding > 0) {
      list = list.filter(s => s.outstanding >= this.minOutstanding!);
    }

    return list;
  }

  // Badge colour based on outstanding
  getBadgeClass(amount: number) {
    if (amount <= 5000) {
      return 'bg-green-100 text-green-700 border-green-300';
    }
    if (amount <= 15000) {
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
    return 'bg-red-100 text-red-700 border-red-300';
  }

  viewDetails(shopId: string) {
    this.router.navigate(['/payments/ledger/detail', shopId]);
  }

  // ====== Export Helpers ======

  private buildCsv(): string {
    const rows = [
      ['Shop ID', 'Shop Name', 'Outstanding'],
      ...this.filteredShops.map(s => [
        s.shopId,
        s.name.replace(/,/g, ' '),
        s.outstanding.toString()
      ])
    ];
    return rows.map(r => r.join(',')).join('\n');
  }

  exportCsv() {
    const csv = this.buildCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledger-outstanding.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Simple Excel-compatible export (CSV with .xlsx name)
  exportExcel() {
    const csv = this.buildCsv();
    const blob = new Blob([csv], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledger-outstanding.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  }
}
