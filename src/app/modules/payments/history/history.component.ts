import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  payments: Payment[] = [
    { id: 'PAY201', amount: 740, date: '18 Nov 2025', status: 'Success' },
    { id: 'PAY202', amount: 980, date: '20 Nov 2025', status: 'Pending' },
    { id: 'PAY203', amount: 1500, date: '21 Nov 2025', status: 'Success' },
    { id: 'PAY204', amount: 300, date: '22 Nov 2025', status: 'Failed' },
    { id: 'PAY205', amount: 1200, date: '25 Nov 2025', status: 'Success' },
    { id: 'PAY206', amount: 850, date: '28 Nov 2025', status: 'Pending' },
  ];

  searchTerm = '';
  statusFilter = 'All';
  sortColumn: keyof Payment = 'id';
  sortDirection: 'asc' | 'desc' = 'desc';

  currentPage = 1;
  pageSize = 5;

  get filteredPayments(): Payment[] {
    let filtered = this.payments;

    if (this.statusFilter !== 'All') {
      filtered = filtered.filter((p) => p.status === this.statusFilter);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) => p.id.toLowerCase().includes(term) || p.amount.toString().includes(term) || p.date.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  get paginatedPayments(): Payment[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredPayments.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPayments.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get showingStartIndex(): number {
    return this.filteredPayments.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingEndIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.filteredPayments.length ? this.filteredPayments.length : end;
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  sortBy(column: keyof Payment) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
}
