import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-admin-inventory-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminInventoryDashboardComponent {
  forecast = inject(ForecastService);

  ngOnInit() {
    this.forecast.generateForecast();
  }
}
