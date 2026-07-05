import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopManagementService, Shop } from '../services/shop-management.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  shops: Shop[] = [];
  filteredShops: Shop[] = [];
  paginatedShops: Shop[] = [];
  expandedShopIds: Set<string> = new Set<string>();

  searchTerm: string = '';
  activeFilter: 'All' | 'Active' | 'Inactive' | 'Suspended' = 'All';
  sortOption: 'newest' | 'oldest' | 'nameAsc' | 'nameDesc' = 'newest';

  filterOptions: ('All' | 'Active' | 'Inactive' | 'Suspended')[] = ['All', 'Active', 'Inactive', 'Suspended'];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(
    private shopService: ShopManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shopService.getShops().subscribe(data => {
      this.shops = data;
      this.applyFilters();
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  filterShops(status: string): void {
    this.activeFilter = status as 'All' | 'Active' | 'Inactive' | 'Suspended';
    this.currentPage = 1;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.shops;

    // Apply Status Filter
    if (this.activeFilter !== 'All') {
      result = result.filter(s => s.status === this.activeFilter);
    }

    // Apply Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(term) || 
        s.id.toLowerCase().includes(term) ||
        s.ownerName.toLowerCase().includes(term)
      );
    }

    // Apply Sorting
    result.sort((a, b) => {
      switch (this.sortOption) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'nameAsc': return a.name.localeCompare(b.name);
        case 'nameDesc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

    this.filteredShops = result;
    this.totalPages = Math.ceil(this.filteredShops.length / this.itemsPerPage) || 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedShops = this.filteredShops.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  viewShopDetails(id: string): void {
    this.router.navigate(['/shop-management/details', id]);
  }

  toggleRemainingData(event: Event, id: string): void {
    event.stopPropagation();
    if (this.expandedShopIds.has(id)) {
      this.expandedShopIds.delete(id);
    } else {
      this.expandedShopIds.add(id);
    }
  }

  getLandmark(address: string): string {
    if (!address) return 'N/A';
    const parts = address.split(', ');
    return parts.length > 1 ? parts[0] : address;
  }

  getLocation(address: string): string {
    if (!address) return 'N/A';
    const parts = address.split(', ');
    return parts.length > 1 ? parts.slice(1).join(', ') : 'N/A';
  }

  navigateToCreate(): void {
    this.router.navigate(['/shop-management/create']);
  }
}
