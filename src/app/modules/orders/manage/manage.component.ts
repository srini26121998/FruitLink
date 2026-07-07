import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAdminService } from '../services/order-admin.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-manage',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage.component.html'
})
export class OrderManageComponent {
  admin = inject(OrderAdminService);
  statuses = this.admin.statuses;

  get pendingOrdersCount() {
    return this.admin.orders().filter(o => o.status === 0).length;
  }

  get approvedOrdersCount() {
    return this.admin.orders().filter(o => o.status === 1).length;
  }

  sortColumn = signal<string>('id');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  searchTerm = signal<string>('');

  onSearchChange(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  sortedOrders = computed(() => {
    let orders = [...this.admin.orders()];
    const term = this.searchTerm().toLowerCase().trim();

    if (term) {
      orders = orders.filter(o => 
        (o.id?.toLowerCase() || '').includes(term) ||
        (o.shop?.toLowerCase() || '').includes(term) ||
        (o.slot?.toLowerCase() || '').includes(term) ||
        (o.paymentStatus?.toLowerCase() || '').includes(term) ||
        (this.statuses[o.status] || '').toLowerCase().includes(term) ||
        o.total?.toString().includes(term) ||
        (o.items?.length || o.qty || 0).toString().includes(term)
      );
    }

    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    return orders.sort((a: any, b: any) => {
      let valA = a[col];
      let valB = b[col];

      if (col === 'items') {
        valA = a.items?.length || a.qty || 0;
        valB = b.items?.length || b.qty || 0;
      }

      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
      return 0;
    });
  });

  paginatedOrders = computed(() => {
    const sorted = this.sortedOrders();
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return sorted.slice(startIndex, startIndex + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.sortedOrders().length / this.pageSize()));
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  sortBy(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  approve(order: any) {
    this.admin.updateOrderStatus(order.id, 1);
  }

  reject(order: any) {
    this.admin.updateOrderStatus(order.id, -1);
  }

  advance(order: any) {
    if (order.status >= 0 && order.status < 6) {
      this.admin.updateOrderStatus(order.id, order.status + 1);
    }
  }

  getStatusClass(status: number): string {
    if (status === -1) {
      return 'bg-red-50 text-red-700 border-red-200';
    }
    const colors = this.admin.statusColors[status];
    return colors ? `${colors.bg} ${colors.text} ${colors.border}` : '';
  }

  getStatusCount(statusIndex: number): number {
    return this.admin.orders().filter(o => o.status === statusIndex).length;
  }

  getStepClass(i: number): string {
    const count = this.getStatusCount(i);
    if (count > 0) {
      const stepColors: { [key: number]: string } = {
        0: 'bg-amber-50 border-white text-amber-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]',
        1: 'bg-blue-50 border-white text-blue-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]',
        2: 'bg-indigo-50 border-white text-indigo-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]',
        3: 'bg-purple-50 border-white text-purple-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]',
        4: 'bg-orange-50 border-white text-orange-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]',
        5: 'bg-teal-50 border-white text-teal-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]',
        6: 'bg-emerald-50 border-white text-emerald-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]'
      };
      return stepColors[i] || 'bg-green-50 border-white text-green-600 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]';
    }
    return 'bg-gray-50 border-white text-gray-400 shadow-[3px_3px_6px_#e2e8f0,-3px_-3px_6px_#ffffff]';
  }
}
