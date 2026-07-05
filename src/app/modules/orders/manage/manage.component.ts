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

  sortedOrders = computed(() => {
    const orders = [...this.admin.orders()];
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
}
