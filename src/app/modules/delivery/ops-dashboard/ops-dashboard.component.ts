import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpsDashboardService } from './services/ops-dashboard.service';
import { OpsDashboardSnapshot } from './mock/ops-dashboard.mock';

@Component({
  selector: 'app-delivery-ops-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ops-dashboard.component.html'
})
export class DeliveryOpsDashboardComponent implements OnInit {

  snapshot = signal<OpsDashboardSnapshot | null>(null);
  loading = signal(true);

  constructor(private service: OpsDashboardService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);

    this.service.getLiveSnapshot().subscribe(res => {
      this.snapshot.set(res);
      this.loading.set(false);
    });
  }
}
