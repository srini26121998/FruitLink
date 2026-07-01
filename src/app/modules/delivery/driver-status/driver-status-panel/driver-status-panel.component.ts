import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverAvailability } from '../models/driver-availability.enum';
import { DriverStatusService } from '../services/driver-status.service';

@Component({
  selector: 'app-driver-status-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-status-panel.component.html'
})
export class DriverStatusPanelComponent implements OnInit {

  readonly statuses = DriverAvailability;

  currentStatus = signal<DriverAvailability | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private service: DriverStatusService) {}

  ngOnInit(): void {
    this.service.getDriverStatus().subscribe({
      next: res => this.currentStatus.set(res.status),
      error: () => this.error.set('Failed to load status')
    });
  }

  updateStatus(status: DriverAvailability) {
    const prev = this.currentStatus();

    // optimistic update
    this.currentStatus.set(status);
    this.loading.set(true);
    this.error.set(null);

    this.service.updateDriverStatus(status).subscribe({
      next: () => this.loading.set(false),
      error: () => {
        // rollback
        this.currentStatus.set(prev);
        this.loading.set(false);
        this.error.set('Failed to update status');
      }
    });
  }
}
