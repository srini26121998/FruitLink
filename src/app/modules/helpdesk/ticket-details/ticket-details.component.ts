import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HelpdeskService, TicketDetails } from '../helpdesk.service';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-details.component.html'
})
export class TicketDetailsComponent implements OnInit {

  private helpdeskService = inject(HelpdeskService);
  private route = inject(ActivatedRoute);
  public location = inject(Location);

  ticket: TicketDetails | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTicket(id);
  }

  loadTicket(id: number) {
    this.helpdeskService.getTicketDetails(id).subscribe((res: TicketDetails) => {
      this.ticket = res;
    });
  }

  goBack() {
    this.location.back();
  }

  sendReply(message: string) {
    if (!message || message.trim() === '') return;
    if (this.ticket) {
      this.ticket.messages.push({
        from: 'User',
        message: message.trim(),
        time: new Date()
      });
    }
  }
}
