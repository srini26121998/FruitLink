import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingService } from '../services/tracking.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-order.component.html'
})
export class TrackOrderComponent {
  tracking = inject(TrackingService);

  orderId = 'ORD-123456'; // Later get from route

  statusFlow = this.tracking.statuses;
  current = this.tracking.currentStatus;
  
  refresh() {
    this.tracking.getOrderStatus(this.orderId).subscribe();
  }
  ngOnInit() {
  setInterval(() => this.refresh(), 5000); // every 5 secs
}

}
