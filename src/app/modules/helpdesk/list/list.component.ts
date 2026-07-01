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
    this.filteredTickets = result;
  }

  openTicket(id: number) {
    this.router.navigate(['/helpdesk/ticket-details', id]);
  }

  openNewTicketModal() {
    this.isNewTicketModalOpen = true;
    this.newTicketTitle = '';
    this.newTicketDescription = '';
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
            title: this.newTicketTitle,
            status: 'Open',
            created: new Date()
          };
          this.tickets.unshift(newTicket);
          this.applyFilters();
          this.closeNewTicketModal();
        }
      });
  }
}
