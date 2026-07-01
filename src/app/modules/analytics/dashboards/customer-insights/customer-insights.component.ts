import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/* 🔥 REQUIRED SHARED COMPONENTS */
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';

/* 🔥 APEX CHART MODULE */
import { NgApexchartsModule } from 'ng-apexcharts';

import { CustomerInsightsService } from './customer-insights.service';
import { CustomerFilter, TopCustomerSummary } from './customer-insights.model';

import {
  createChartConfig,
  createPieChartConfig,
  ChartConfig
} from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-customer-insights',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    PageHeaderComponent,
    KpiCardComponent
  ],
  templateUrl: './customer-insights.component.html',
  styleUrls: ['./customer-insights.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerInsightsComponent {

  private readonly router = inject(Router);
  private readonly insightsService = inject(CustomerInsightsService);

  /* ---------------- SIGNALS ---------------- */
  readonly filter = this.insightsService.filter;
  readonly kpis = this.insightsService.kpis;
  readonly trends = this.insightsService.trends;
  readonly segments = this.insightsService.segments;
  readonly topCustomers = this.insightsService.topCustomers;

  /* ---------------- FILTER ---------------- */
  onFilterChange(filter: CustomerFilter): void {
    this.insightsService.setFilter(filter);
  }

  /* ---------------- DRILLDOWN ---------------- */
  openCustomerDrilldown(customer: TopCustomerSummary): void {
    this.router.navigate([
      '/analytics/drilldown/customer',
      customer.customerId
    ]);
  }

  /* ---------------- CHARTS ---------------- */

  readonly customerGrowthChart = computed<ChartConfig>(() => {
    const data = this.trends().customerGrowth;
    return createChartConfig(
      'line',
      300,
      data.map(d => d.period),
      'Customers',
      data.map(d => d.value)
    );
  });

  readonly revenueChart = computed<ChartConfig>(() => {
    const data = this.trends().revenueTrend;
    return createChartConfig(
      'line',
      300,
      data.map(d => d.period),
      'Revenue',
      data.map(d => d.value)
    );
  });

  readonly frequencyChart = computed<ChartConfig>(() => {
    const data = this.trends().orderFrequency;
    return createChartConfig(
      'line',
      300,
      data.map(d => d.period),
      'Order Frequency (Days)',
      data.map(d => d.value)
    );
  });

 readonly segmentChart = computed(() => {
  const segments = this.segments();

  return createPieChartConfig(
    'donut',
    300,
    segments.map(s => s.segment),
    segments.map(s => s.customerCount) // ✅ MISSING ARGUMENT FIXED
  );
});

}
