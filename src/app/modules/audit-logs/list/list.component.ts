import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuditLogService, AuditLog } from '../services/audit-log.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // Search & Filter Values
  searchText = '';
  filterModule = 'All';
  filterStatus = 'All';

  logs: AuditLog[] = [];
  filteredLogs: AuditLog[] = [];

  sortOption: string = 'newest';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.filteredLogs.length / this.itemsPerPage) || 1;
  }

  get paginatedLogs(): AuditLog[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSortChange() {
    this.applyFilters();
  }

  // Available Filter Options
  modules = ['All', 'Authentication', 'Orders', 'Products', 'Delivery', 'Payments', 'System Settings', 'Analytics'];
  statuses = ['All', 'Success', 'Failed', 'Pending'];

  constructor(
    private router: Router,
    private auditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.auditLogService.getLogs().subscribe(data => {
      this.logs = data;
      this.applyFilters();
    });
  }

  updateSearch(event: any) {
    this.searchText = event.target.value.toLowerCase();
    this.applyFilters();
  }

  updateFilterModule(event: any) {
    this.filterModule = event.target.value;
    this.applyFilters();
  }

  updateFilterStatus(event: any) {
    this.filterStatus = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredLogs = this.logs.filter(l => {
      // Filter by module
      if (this.filterModule !== 'All' && l.module !== this.filterModule) return false;
      
      // Filter by status
      if (this.filterStatus !== 'All' && l.status !== this.filterStatus) return false;

      // Filter by search text
      const combined = (
        l.id + 
        l.userName + 
        l.userRole + 
        l.activity + 
        l.module + 
        (l.recordId || '')
      ).toLowerCase();
      
      if (this.searchText && !combined.includes(this.searchText)) return false;

      return true;
    });

    // Sort logic
    if (this.sortOption === 'newest') {
      this.filteredLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (this.sortOption === 'oldest') {
      this.filteredLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortOption === 'moduleAsc') {
      this.filteredLogs.sort((a, b) => a.module.localeCompare(b.module));
    } else if (this.sortOption === 'moduleDesc') {
      this.filteredLogs.sort((a, b) => b.module.localeCompare(a.module));
    }

    this.currentPage = 1;
  }

  openDetails(id: string) {
    this.router.navigate(['/audit-logs', id]);
  }

  exportLogs() {
    // Generate simple CSV
    if (this.filteredLogs.length === 0) return;
    
    const headers = ['ID', 'Date', 'User Name', 'Role', 'Activity', 'Module', 'Record ID', 'Status'];
    const csvRows = [headers.join(',')];
    
    this.filteredLogs.forEach(log => {
      const row = [
        log.id,
        log.date.toISOString(),
        log.userName,
        log.userRole,
        log.activity,
        log.module,
        log.recordId || 'N/A',
        log.status
      ];
      csvRows.push(row.join(','));
    });
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'audit_logs_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
