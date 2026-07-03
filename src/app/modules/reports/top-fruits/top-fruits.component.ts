import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TopFruit {
  id: string;
  name: string;
  orders: number;
  sales: number;
  trend: 'up' | 'down';
  trendValue: string;
}

@Component({
  selector: 'app-top-fruits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-fruits.component.html',
  styleUrl: './top-fruits.component.css'
})
export class TopFruitsComponent {
  fruits = signal<TopFruit[]>([
    { id: '1', name: 'Apple - Premium Fuji', orders: 110, sales: 13200, trend: 'up', trendValue: '+12%' },
    { id: '2', name: 'Banana - Robusta', orders: 95, sales: 4200, trend: 'up', trendValue: '+5%' },
    { id: '3', name: 'Mango - Alphonso', orders: 150, sales: 25000, trend: 'down', trendValue: '-2%' },
    { id: '4', name: 'Orange - Nagpur', orders: 85, sales: 8500, trend: 'up', trendValue: '+18%' },
    { id: '5', name: 'Grapes - Seedless', orders: 60, sales: 7200, trend: 'down', trendValue: '-5%' },
    { id: '6', name: 'Pomegranate', orders: 40, sales: 6000, trend: 'up', trendValue: '+8%' },
    { id: '7', name: 'Papaya', orders: 35, sales: 2100, trend: 'up', trendValue: '+2%' },
    { id: '8', name: 'Watermelon', orders: 120, sales: 15000, trend: 'up', trendValue: '+25%' },
    { id: '9', name: 'Strawberry', orders: 25, sales: 5000, trend: 'down', trendValue: '-10%' },
    { id: '10', name: 'Kiwi', orders: 30, sales: 4500, trend: 'up', trendValue: '+4%' },
    { id: '11', name: 'Pineapple', orders: 45, sales: 3600, trend: 'up', trendValue: '+7%' },
    { id: '12', name: 'Guava', orders: 50, sales: 2500, trend: 'down', trendValue: '-3%' }
  ]);

  sortColumn = signal<keyof TopFruit>('sales');
  sortDirection = signal<'asc' | 'desc'>('desc');
  currentPage = signal(1);
  itemsPerPage = signal(5);

  sortedFruits = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;
    return [...this.fruits()].sort((a, b) => {
      if (a[col] < b[col]) return -1 * dir;
      if (a[col] > b[col]) return 1 * dir;
      return 0;
    });
  });

  paginatedFruits = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.sortedFruits().slice(start, start + this.itemsPerPage());
  });

  totalPages = computed(() => Math.ceil(this.fruits().length / this.itemsPerPage()));

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  get showingStart() {
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  }
  
  get showingEnd() {
    return Math.min(this.currentPage() * this.itemsPerPage(), this.fruits().length);
  }

  sortBy(column: keyof TopFruit) {
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
