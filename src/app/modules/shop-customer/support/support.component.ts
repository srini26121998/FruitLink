import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html'
})
export class SupportComponent {

  private shopService = inject(ShopService);

  subject = '';
  message = '';
  file: File | null = null;

  ticketList: any[] = [];

  ngOnInit(): void {
    this.loadTickets();
  }

  /** Load Support Tickets */
  loadTickets() {
    this.shopService.getNotifications().subscribe((res: any[]) => {
      this.ticketList = res;
    });
  }

  /** File Input Change */
  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  /** Submit Support Ticket */
  submitTicket() {
    if (!this.subject || !this.message) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('subject', this.subject);
    formData.append('message', this.message);

    if (this.file) {
      formData.append('file', this.file);
    }

    this.shopService.sendSupportMessage(formData).subscribe(() => {
      alert('Support request submitted');
      this.subject = '';
      this.message = '';
      this.file = null;
      this.loadTickets();
    });
  }
}
