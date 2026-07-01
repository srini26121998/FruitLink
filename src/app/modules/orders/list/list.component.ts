import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Order {
  id: string;
  shop: string;
  total: number;
  status: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  orders: Order[] = [
    { id: '#ORD1201', shop: 'Juice Hub', total: 1250, status: 'Pending' },
    { id: '#ORD1202', shop: 'Cool Sip Station', total: 890, status: 'Delivered' },
    { id: '#ORD1203', shop: 'Fresh Bites', total: 2300, status: 'Approved' },
    { id: '#ORD1204', shop: 'Morning Dew', total: 450, status: 'Pending' },
    { id: '#ORD1205', shop: 'Sunny Sides', total: 1560, status: 'Delivered' },
    { id: '#ORD1206', shop: 'Green Leaf', total: 3100, status: 'Approved' },
    { id: '#ORD1207', shop: 'Daily Squeeze', total: 720, status: 'Pending' },
    { id: '#ORD1208', shop: 'The Fruit Basket', total: 1980, status: 'Delivered' },
    { id: '#ORD1209', shop: 'Citrus Stand', total: 540, status: 'Approved' },
    { id: '#ORD1210', shop: 'Berry Good', total: 2100, status: 'Pending' },
    { id: '#ORD1211', shop: 'Mango Magic', total: 3300, status: 'Delivered' },
    { id: '#ORD1212', shop: 'Apple Valley', total: 1100, status: 'Approved' },
  ];

  searchTerm: string = '';
  statusFilter: string = 'All';

  // Sorting
  sortColumn: keyof Order | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get filteredOrders(): Order[] {
    let filtered = this.orders;

    if (this.searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.shop.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === this.statusFilter);
    }

    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[this.sortColumn as keyof Order];
        const valB = b[this.sortColumn as keyof Order];
        
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
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  get showingStartIndex(): number {
    return this.filteredOrders.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredOrders.length);
  }

  sortBy(column: keyof Order) {
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
}
