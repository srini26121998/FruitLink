import { Component } from '@angular/core';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [NgIf, NgForOf, DatePipe],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  // Search & Filter Values
  searchText = '';
  filterAction = 'All';

  constructor(private router: Router) {}

  logs = [
    { id: 'A1001', user: 'Mario', action: 'Login', meta: 'IP 10.0.0.1', createdAt: new Date() },
    { id: 'A1002', user: 'Admin', action: 'Approve Order', meta: '#ORD1201 approved', createdAt: new Date(Date.now() - 3600000) },
    { id: 'A1003', user: 'System', action: 'DB Backup', meta: 'Backup completed', createdAt: new Date(Date.now() - 86400000) },
  ];

  updateSearch(event: any) {
    this.searchText = event.target.value.toLowerCase();
  }

  updateFilter(event: any) {
    this.filterAction = event.target.value;
  }

  openDetails(id: string) {
    this.router.navigate(['/audit-logs', id]);
  }

  get filteredLogs() {
    return this.logs.filter(l => {
      // Filter by action
      if (this.filterAction !== 'All' && l.action !== this.filterAction) return false;

      // Filter by search text
      const combined = (l.id + l.user + l.action + l.meta).toLowerCase();
      return combined.includes(this.searchText);
    });
  }
}
