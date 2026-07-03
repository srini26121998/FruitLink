import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ShopFrequency {
  id: string;
  shopName: string;
  location: string;
  ordersThisMonth: number;
  totalSpend: number;
  frequency: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-shop-frequency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-frequency.component.html',
  styleUrl: './shop-frequency.component.css'
})
export class ShopFrequencyComponent {
  shops = signal<ShopFrequency[]>([
    { id: '1', shopName: 'Juice Hub', location: 'Downtown', ordersThisMonth: 14, totalSpend: 5480, frequency: 'high' },
    { id: '2', shopName: 'Fresh Sip', location: 'Westside', ordersThisMonth: 11, totalSpend: 4120, frequency: 'high' },
    { id: '3', shopName: 'Daily Needs', location: 'North Ave', ordersThisMonth: 4, totalSpend: 1250, frequency: 'low' },
    { id: '4', shopName: 'Green Grocers', location: 'East End', ordersThisMonth: 8, totalSpend: 3100, frequency: 'medium' },
    { id: '5', shopName: 'City Fruits', location: 'Central Square', ordersThisMonth: 18, totalSpend: 8200, frequency: 'high' },
    { id: '6', shopName: 'Healthy Bites', location: 'South Park', ordersThisMonth: 2, totalSpend: 800, frequency: 'low' },
    { id: '7', shopName: 'Corner Shop', location: 'Westside', ordersThisMonth: 6, totalSpend: 2400, frequency: 'medium' },
    { id: '8', shopName: 'Premium Fruits', location: 'Uptown', ordersThisMonth: 22, totalSpend: 12500, frequency: 'high' }
  ]);

  sortColumn = signal<keyof ShopFrequency>('ordersThisMonth');
  sortDirection = signal<'asc' | 'desc'>('desc');
  currentPage = signal(1);
  itemsPerPage = signal(5);

  sortedShops = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;
    return [...this.shops()].sort((a, b) => {
      if (a[col] < b[col]) return -1 * dir;
      if (a[col] > b[col]) return 1 * dir;
      return 0;
    });
  });

  paginatedShops = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.sortedShops().slice(start, start + this.itemsPerPage());
  });

  totalPages = computed(() => Math.ceil(this.shops().length / this.itemsPerPage()));
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  get showingStart() { return (this.currentPage() - 1) * this.itemsPerPage() + 1; }
  get showingEnd() { return Math.min(this.currentPage() * this.itemsPerPage(), this.shops().length); }

  sortBy(column: keyof ShopFrequency) {
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
    }
  }
}
