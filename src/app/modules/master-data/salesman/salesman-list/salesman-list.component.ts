import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salesman-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salesman-list.component.html'
})
export class SalesmanListComponent {
  private router = inject(Router);
  
  searchQuery = signal('');
  currentPage = signal(1);
  pageSize = signal(10);
  sortColumn = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  salesmen = signal([
    { id: 1, name: 'Amit Kumar', email: 'amit.kumar@example.com', phone: '9876543210', location: 'Bangalore South', status: 'Active' },
    { id: 2, name: 'Rajesh Singh', email: 'rajesh.singh@example.com', phone: '9123456780', location: 'Whitefield', status: 'Active' },
    { id: 3, name: 'Suresh Menon', email: 'suresh.m@example.com', phone: '9988776655', location: 'Indiranagar', status: 'Inactive' },
    { id: 4, name: 'Vikram Gupta', email: 'vikram.g@example.com', phone: '9876543211', location: 'Koramangala', status: 'Active' },
    { id: 5, name: 'Neha Sharma', email: 'neha.s@example.com', phone: '9876543212', location: 'HSR Layout', status: 'On Leave' },
    { id: 6, name: 'Rahul Verma', email: 'rahul.v@example.com', phone: '9876543213', location: 'Jayanagar', status: 'Active' },
    { id: 7, name: 'Priya Patel', email: 'priya.p@example.com', phone: '9876543214', location: 'Malleswaram', status: 'Inactive' },
    { id: 8, name: 'Karan Singh', email: 'karan.s@example.com', phone: '9876543215', location: 'Hebbal', status: 'Active' },
    { id: 9, name: 'Anjali Desai', email: 'anjali.d@example.com', phone: '9876543216', location: 'BTM Layout', status: 'Active' },
    { id: 10, name: 'Rohan Mehta', email: 'rohan.m@example.com', phone: '9876543217', location: 'Marathahalli', status: 'Active' },
    { id: 11, name: 'Kavita Reddy', email: 'kavita.r@example.com', phone: '9876543218', location: 'Yelahanka', status: 'On Leave' },
    { id: 12, name: 'Arjun Das', email: 'arjun.d@example.com', phone: '9876543219', location: 'Bellandur', status: 'Active' }
  ]);

  filteredSalesmen = computed(() => {
    let result = this.salesmen();
    
    // Filtering
    const q = this.searchQuery().toLowerCase();
    if (q) {
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.email.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      );
    }
    
    // Sorting
    const col = this.sortColumn();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;
    result.sort((a: any, b: any) => {
      if (a[col] < b[col]) return -1 * dir;
      if (a[col] > b[col]) return 1 * dir;
      return 0;
    });
    
    return result;
  });

  paginatedSalesmen = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredSalesmen().slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredSalesmen().length / this.pageSize()) || 1;
  });

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  sortBy(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  createSalesman() {
    this.router.navigate(['/master-data/salesmen/create']);
  }

  editSalesman(id: number) {
    this.router.navigate(['/master-data/salesmen/edit', id]);
  }
  
  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }
}
