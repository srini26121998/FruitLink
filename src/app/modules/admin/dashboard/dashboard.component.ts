import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  dash = inject(DashboardService);

  // Chart configs
  weeklyOrdersChart: any;
  topFruitsChart: any;
  revenueTrendChart: any;
  deliveryPerformanceChart: any;

  ngOnInit() {
    this.setupCharts();
  }

  setupCharts() {

    // WEEKLY ORDERS
    this.weeklyOrdersChart = {
      chart: { type: 'bar', height: 320 },
      colors: ['#6366F1'],  // Indigo
      series: [{ name: 'Orders', data: this.dash.weeklyOrders().values }],
      xaxis: { categories: this.dash.weeklyOrders().labels }
    };

    // TOP FRUITS
    this.topFruitsChart = {
      chart: { type: 'donut', height: 340 },
      labels: this.dash.topFruits().map(f => f.name),
      series: this.dash.topFruits().map(f => f.qty),
      colors: ['#F43F5E', '#F97316', '#16A34A', '#0EA5E9', '#8B5CF6']
    };

    // REVENUE TREND
    this.revenueTrendChart = {
      chart: { type: 'line', height: 330 },
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#10B981'],
      series: [{ name: 'Revenue', data: this.dash.revenueTrend().values }],
      xaxis: { categories: this.dash.revenueTrend().labels }
    };

    // DELIVERY PERFORMANCE
    this.deliveryPerformanceChart = {
      chart: { type: 'pie', height: 300 },
      labels: ['Delivered', 'Delayed', 'Cancelled'],
      series: [
        this.dash.deliveryPerformance().delivered,
        this.dash.deliveryPerformance().delayed,
        this.dash.deliveryPerformance().cancelled
      ],
      colors: ['#22C55E', '#F59E0B', '#EF4444']
    };
  }
}
