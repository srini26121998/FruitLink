import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HelpdeskService, Ticket } from '../helpdesk.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  private helpdeskService = inject(HelpdeskService);
  private router = inject(Router);

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  searchTerm: string = '';
  activeFilter: string = 'All';

  isNewTicketModalOpen = false;
  newTicketTitle = '';
  newTicketDescription = '';
  newTicketShop = 'Default Shop';
  newTicketCategory = 'General';
  newTicketPriority = 'Normal';

  sortOption: string = 'newest';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.filteredTickets.length / this.itemsPerPage) || 1;
  }

  get paginatedTickets(): Ticket[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTickets.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSortChange() {
    this.applyFilters();
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.helpdeskService.getTickets().subscribe((res: Ticket[]) => {
      this.tickets = res;
      this.filteredTickets = res;
    });
  }

  filterTickets(status: string) {
    this.activeFilter = status;
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  applyFilters() {
    let result = this.tickets;
    if (this.activeFilter !== 'All') {
      result = result.filter(t => t.status === this.activeFilter);
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(term) || t.id.toString().includes(term));
    }
    
    // Sort
    if (this.sortOption === 'newest') {
      result.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else if (this.sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
    } else if (this.sortOption === 'priorityDesc') {
      const p = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Normal': 1, 'Low': 0 } as any;
      result.sort((a, b) => p[b.priority] - p[a.priority]);
    } else if (this.sortOption === 'priorityAsc') {
      const p = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Normal': 1, 'Low': 0 } as any;
      result.sort((a, b) => p[a.priority] - p[b.priority]);
    }

    this.filteredTickets = result;
    this.currentPage = 1; // Reset to first page
  }

  openTicket(id: number) {
    this.router.navigate(['/helpdesk/ticket-details', id]);
  }

  openNewTicketModal() {
    this.isNewTicketModalOpen = true;
    this.newTicketTitle = '';
    this.newTicketDescription = '';
    this.newTicketShop = 'Default Shop';
    this.newTicketCategory = 'General';
    this.newTicketPriority = 'Normal';
  }

  closeNewTicketModal() {
    this.isNewTicketModalOpen = false;
  }

  submitNewTicket() {
    if (!this.newTicketTitle.trim()) return;

    this.helpdeskService.createTicket({ title: this.newTicketTitle, description: this.newTicketDescription })
      .subscribe(res => {
        if (res.success) {
          const newTicket: Ticket = {
            id: res.ticketId,
            ticketNumber: `TKT-${res.ticketId}`,
            title: this.newTicketTitle,
            shop: this.newTicketShop,
            category: this.newTicketCategory,
            priority: this.newTicketPriority,
            description: this.newTicketDescription,
            assignedTo: 'Unassigned',
            status: 'Open',
            created: new Date(),
            updatedDate: new Date()
          };
          this.tickets.unshift(newTicket);
          this.applyFilters();
          this.closeNewTicketModal();
        }
      });
  }
}
