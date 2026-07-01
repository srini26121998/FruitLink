// src/app/modules/analytics/dashboards/growth-dashboard/growth-dashboard.component.ts

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import { GrowthDashboardService } from './growth-dashboard.service';

import {
  buildChart,
  createChartConfig,
  createPieChartConfig
} from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-growth-dashboard',
  standalone: true,
  imports: [CommonModule, SharedChartsModule],
  templateUrl: './growth-dashboard.component.html',
  styleUrls: ['./growth-dashboard.component.css']
})
export class GrowthDashboardComponent {

  svc = inject(GrowthDashboardService);

  filter = this.svc.filter;
  summary = this.svc.summary;
  revenue = this.svc.revenueTrend;
  regions = this.svc.regionPerformance;
  profit = this.svc.profitability;

  filterOptions = ['today', 'week', 'month', 'year'];

  setFilter(v: any) {
    this.svc.setFilter(v);
  }

  getGrowthColor(v: number): string {
    return v >= 0 ? 'text-green-600' : 'text-red-600';
  }

  /** 📈 Revenue Trend (line chart) */
  revenueTrendChart = computed(() =>
    createChartConfig(
      'line',
      280,
      this.revenue().map(x => x.month),
      'Revenue',
      this.revenue().map(x => x.revenue)
    )
  );

  /** 🌍 Region Revenue (bar chart) */
  regionChart = computed(() =>
    createChartConfig(
      'bar',
      280,
      this.regions().map(r => r.region),
      'Revenue',
      this.regions().map(r => r.revenue)
    )
  );

  /** 💰 Profit Split (pie) */
  profitChart = computed(() =>
    createPieChartConfig(
      'pie',
      260,
      this.profit().map(p => p.label),
      this.profit().map(p => p.value)
    )
  );
}
