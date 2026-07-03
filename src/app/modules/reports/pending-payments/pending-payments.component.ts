import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PendingPayment {
  id: string;
  shopName: string;
  contactPerson: string;
  pendingAmount: number;
  lastPaymentDate: string;
  status: 'critical' | 'warning' | 'normal';
  phone: string;
  creditLimit: number;
  unpaidInvoices: number;
  lastInvoiceDate: string;
}

@Component({
  selector: 'app-pending-payments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pending-payments.component.html',
  styleUrl: './pending-payments.component.css'
})
export class PendingPaymentsComponent {
  payments = signal<PendingPayment[]>([
    { id: '1', shopName: 'Juice Hub', contactPerson: 'Rahul Kumar', pendingAmount: 2400, lastPaymentDate: '15 Nov 2025', status: 'normal', phone: '+91 9876543210', creditLimit: 10000, unpaidInvoices: 2, lastInvoiceDate: '18 Nov 2025' },
    { id: '2', shopName: 'Fruit King', contactPerson: 'Amit Singh', pendingAmount: 1850, lastPaymentDate: '12 Nov 2025', status: 'normal', phone: '+91 8765432109', creditLimit: 8000, unpaidInvoices: 1, lastInvoiceDate: '20 Nov 2025' },
    { id: '3', shopName: 'Fresh Mart', contactPerson: 'Suresh Das', pendingAmount: 8500, lastPaymentDate: '01 Oct 2025', status: 'critical', phone: '+91 7654321098', creditLimit: 10000, unpaidInvoices: 5, lastInvoiceDate: '10 Oct 2025' },
    { id: '4', shopName: 'Daily Fresh', contactPerson: 'Priya Sharma', pendingAmount: 4200, lastPaymentDate: '28 Oct 2025', status: 'warning', phone: '+91 6543210987', creditLimit: 5000, unpaidInvoices: 3, lastInvoiceDate: '05 Nov 2025' },
    { id: '5', shopName: 'Green Grocers', contactPerson: 'Vikram Reddy', pendingAmount: 1200, lastPaymentDate: '20 Nov 2025', status: 'normal', phone: '+91 5432109876', creditLimit: 15000, unpaidInvoices: 1, lastInvoiceDate: '22 Nov 2025' },
    { id: '6', shopName: 'City Fruits', contactPerson: 'Anjali Desai', pendingAmount: 6700, lastPaymentDate: '15 Sep 2025', status: 'critical', phone: '+91 4321098765', creditLimit: 8000, unpaidInvoices: 4, lastInvoiceDate: '25 Sep 2025' },
    { id: '7', shopName: 'Healthy Bites', contactPerson: 'Mohit Jain', pendingAmount: 3100, lastPaymentDate: '05 Nov 2025', status: 'warning', phone: '+91 3210987654', creditLimit: 6000, unpaidInvoices: 2, lastInvoiceDate: '10 Nov 2025' },
    { id: '8', shopName: 'Nature Fresh', contactPerson: 'Sneha Patel', pendingAmount: 900, lastPaymentDate: '22 Nov 2025', status: 'normal', phone: '+91 2109876543', creditLimit: 12000, unpaidInvoices: 1, lastInvoiceDate: '24 Nov 2025' }
  ]);

  sortColumn = signal<keyof PendingPayment>('pendingAmount');
  sortDirection = signal<'asc' | 'desc'>('desc');
  currentPage = signal(1);
  itemsPerPage = signal(5);
  expandedRowId = signal<string | null>(null);

  sortedPayments = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;
    return [...this.payments()].sort((a, b) => {
      if (a[col] < b[col]) return -1 * dir;
      if (a[col] > b[col]) return 1 * dir;
      return 0;
    });
  });

  paginatedPayments = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.sortedPayments().slice(start, start + this.itemsPerPage());
  });

  totalPages = computed(() => Math.ceil(this.payments().length / this.itemsPerPage()));
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  get showingStart() { return (this.currentPage() - 1) * this.itemsPerPage() + 1; }
  get showingEnd() { return Math.min(this.currentPage() * this.itemsPerPage(), this.payments().length); }

  sortBy(column: keyof PendingPayment) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('desc');
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.expandedRowId.set(null); // Close expanded row on page change
    }
  }

  toggleExpand(id: string) {
    this.expandedRowId.update(current => current === id ? null : id);
  }
}
