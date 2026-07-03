import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderAdminService, Order } from '../../orders/services/order-admin.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-shop-order-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order-history.component.html'
})
export class ShopOrderHistoryComponent implements OnInit {
  admin = inject(OrderAdminService);
  auth = inject(AuthService);

  orders: Order[] = [];
  
  searchTerm: string = '';
  statusFilter: string = 'All';
  dateFilter: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // In a real app, this would filter by the logged-in user's shop ID
    // For now we get all orders since it's mock data
    this.orders = this.admin.orders();
  }

  get filteredOrders(): Order[] {
    let filtered = this.orders;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(term) ||
        order.items.some(i => i.name.toLowerCase().includes(term))
      );
    }

    if (this.statusFilter !== 'All') {
      const statusIndex = this.admin.statuses.indexOf(this.statusFilter);
      filtered = filtered.filter(order => order.status === statusIndex);
    }

    if (this.dateFilter) {
      filtered = filtered.filter(order => order.date === this.dateFilter);
    }

    // Sort by date desc (newest first)
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = 'All';
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

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}
