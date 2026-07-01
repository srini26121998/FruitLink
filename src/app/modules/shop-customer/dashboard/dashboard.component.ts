import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ShopDashboardService } from './dashboard.service';

@Component({
  selector: 'app-shop-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html'
})
export class ShopDashboardComponent implements OnInit {

  dash = inject(ShopDashboardService);

  weeklyChart: any;
  topItemsChart: any;

  ngOnInit() {
    this.loadCharts();
  }

  loadCharts() {
    // Weekly Purchase Trend
    this.weeklyChart = {
      chart: { type: 'area', height: 320 },
      series: [{ name: 'Spent (₹)', data: this.dash.weeklyPurchases().values }],
      colors: ['#0EA5E9'],
      xaxis: { categories: this.dash.weeklyPurchases().labels },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: "gradient" }
    };

    // Top Purchased Items
    this.topItemsChart = {
      chart: { type: 'donut', height: 300 },
      labels: this.dash.topPurchased().map(t => t.name),
      series: this.dash.topPurchased().map(t => t.value),
      colors: ['#F59E0B', '#10B981', '#6366F1', '#EF4444', '#06B6D4']
    };
  }
}
