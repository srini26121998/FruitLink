// src/app/modules/analytics/dashboards/payment-analytics/payment-analytics.component.ts

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentAnalyticsService } from './payment-analytics.service';
import { PaymentFilter } from './payment-analytics.model';

import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import {
  buildChart,
  createChartConfig,
  createPieChartConfig
} from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-payment-analytics',
  standalone: true,
  imports: [CommonModule, SharedChartsModule],
  templateUrl: './payment-analytics.component.html',
  styleUrls: ['./payment-analytics.component.css'],
})
export class PaymentAnalyticsComponent {

  svc = inject(PaymentAnalyticsService);

  filter = this.svc.filter;
  summary = this.svc.summary;
  dailyStats = this.svc.dailyStats;
  paymentMethods = this.svc.paymentMethods;
  topCustomers = this.svc.topCustomers;

  filterOptions: PaymentFilter[] = ['today', 'week', 'month', 'year'];

  setFilter(v: PaymentFilter) {
    this.svc.setFilter(v);
  }

  getTrendColor(value: number) {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  }

  // --------------------------------------------------------
  // 📊 CHARTS — Using global chart utils
  // --------------------------------------------------------

  /** Line Chart: Daily Payments Trend */
  dailyChart = computed(() =>
    createChartConfig(
      'line',
      280,
      this.dailyStats().map(d => d.day),
      'Amount',
      this.dailyStats().map(d => d.amount),
    )
  );

  /** Bar Chart: Count of payments by method */
  paymentMethodChart = computed(() =>
    createChartConfig(
      'bar',
      280,
      this.paymentMethods().map(m => m.method),
      'Payments',
      this.paymentMethods().map(m => m.count),
    )
  );

  /** Pie Chart: Revenue share by method */
  methodRevenuePie = computed(() =>
    createPieChartConfig(
        'pie',
      300,
      this.paymentMethods().map(m => m.method),
      this.paymentMethods().map(m => m.amount),
    )
  );
}
