import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { OrderAdminService, Order } from '../services/order-admin.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  admin = inject(OrderAdminService);
  private router = inject(Router);

  searchTerm: string = '';
  statusFilter: string = 'All';
  typeFilter: string = 'All';
  dateFilter: string = '';

  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;

  // View mode
  viewMode: 'table' | 'card' = 'table';

  get orders(): Order[] {
    return this.admin.orders();
  }

  get filteredOrders(): Order[] {
    let filtered = this.orders;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(term) ||
        order.shop.toLowerCase().includes(term) ||
        order.items.some(i => i.name.toLowerCase().includes(term))
      );
    }

    if (this.statusFilter !== 'All') {
      const statusIndex = this.admin.statuses.indexOf(this.statusFilter);
      filtered = filtered.filter(order => order.status === statusIndex);
    }

    if (this.typeFilter !== 'All') {
      filtered = filtered.filter(order => order.orderType === this.typeFilter.toLowerCase());
    }

    if (this.dateFilter) {
      filtered = filtered.filter(order => order.date === this.dateFilter);
    }

    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let valA: any, valB: any;
        switch (this.sortColumn) {
          case 'id': valA = a.id; valB = b.id; break;
          case 'shop': valA = a.shop; valB = b.shop; break;
          case 'total': valA = a.total; valB = b.total; break;
          case 'status': valA = a.status; valB = b.status; break;
          case 'date': valA = a.date; valB = b.date; break;
          default: return 0;
        }
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }

  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get showingStartIndex(): number {
    return this.filteredOrders.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredOrders.length);
  }

  // ── KPI Stats ──
  get totalOrdersCount(): number { return this.orders.length; }
  get pendingCount(): number { return this.orders.filter(o => o.status === 0).length; }
  get approvedCount(): number { return this.orders.filter(o => o.status === 1).length; }
  get deliveredCount(): number { return this.orders.filter(o => o.status >= 5).length; }
  get totalRevenue(): number { return this.orders.reduce((s, o) => s + o.total, 0); }
  
  get todayOrdersCount(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.orders.filter(o => o.date === today).length;
  }

  get todayDeliveredCount(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.orders.filter(o => o.date === today && o.status >= 5).length;
  }

  get lateDeliveredCount(): number {
    // For prototype purposes, mocking late deliveries
    return this.orders.filter(o => o.status >= 5 && parseInt(o.id.split('-')[1]) % 2 === 0).length;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = 'All';
    this.typeFilter = 'All';
    this.dateFilter = '';
    this.currentPage = 1;
  }

  getStatusClass(status: number): string {
    const colors = this.admin.statusColors[status];
    return colors ? `${colors.bg} ${colors.text} ${colors.border}` : '';
  }

  getStatusLabel(status: number): string {
    return this.admin.statuses[status] || 'Unknown';
  }

  getOrderTypeLabel(type: string): string {
    return type === 'bulk' ? 'Bulk' : 'Daily';
  }

  getOrderTypeBadgeClass(type: string): string {
    return type === 'bulk'
      ? 'bg-violet-50 text-violet-700 border-violet-200'
      : 'bg-teal-50 text-teal-700 border-teal-200';
  }

  reorder(order: Order, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.admin.reorderOrder(order.id, this.router);
  }

  duplicate(order: Order, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.admin.duplicateOrder(order.id, this.router);
  }
}
