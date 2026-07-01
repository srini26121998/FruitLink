import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RbacService } from '../../../core/services/rbac.service';
import { RouterLink } from '@angular/router';
import { Role } from '../../../core/models/rbac.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {

  rbac = inject(RbacService);
  roles = this.rbac.roles;

  // Sorting
  sortColumn = signal<keyof Role | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Pagination
  currentPage = signal(1);
  pageSize = signal(5);

  sortedRoles = computed(() => {
    const data = [...this.roles()];
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col) return data;

    return data.sort((a, b) => {
      const valA = a[col];
      const valB = b[col];

      let cmpA = Array.isArray(valA) ? valA.length : valA;
      let cmpB = Array.isArray(valB) ? valB.length : valB;

      if (typeof cmpA === 'string' && typeof cmpB === 'string') {
        cmpA = cmpA.toLowerCase();
        cmpB = cmpB.toLowerCase();
      }

      if (cmpA < cmpB) return dir === 'asc' ? -1 : 1;
      if (cmpA > cmpB) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  paginatedRoles = computed(() => {
    const data = this.sortedRoles();
    const start = (this.currentPage() - 1) * this.pageSize();
    return data.slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.sortedRoles().length / this.pageSize()));

  sortBy(column: keyof Role) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
