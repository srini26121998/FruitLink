import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';

import { ProductSalesService } from './product-sales.service';
import {
  buildChart,
  createChartConfig,
  createPieChartConfig
} from '../../../../shared/charts/chart.utils';

import { AnalyticsExportService } from '../../export/analytics-export.service';

@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [CommonModule, SharedChartsModule, KpiCardComponent],
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.css'],
})
export class ProductSalesComponent {

  private svc = inject(ProductSalesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private exportSvc = inject(AnalyticsExportService);

  shopName = signal('Shop');
  filter = this.svc.filter;

  products = this.svc.products;
  summary = this.svc.summary;
  trend = this.svc.salesTrend;

  filterOptions = ['today', 'week', 'month', 'year'];

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.shopName.set(params['shop'] ?? 'Shop');
    });
  }

  setFilter(v: any) {
    this.svc.setFilter(v);
  }

  // PIE chart
  productPieChart = computed(() =>
    createPieChartConfig(
        'donut',
      280,
      this.products().map(p => p.product),
      this.products().map(p => p.percentage)
    )
  );

  // LINE chart – trend
  trendChart = computed(() =>
    createChartConfig(
      'line',
      280,
      this.trend().map(x => x.month),
      'Sales',
      this.trend().map(x => x.sales)
    )
  );

  // BAR — revenue
  revenueChart = computed(() =>
    createChartConfig(
      'bar',
      280,
      this.products().map(x => x.product),
      'Revenue',
      this.products().map(x => x.revenue)
    )
  );

  exportExcel() {
    this.exportSvc.exportExcel(this.products(), `product-sales-${this.shopName()}`);
  }

  exportPDF() {
    this.exportSvc.exportPDF('product-sales-report', `product-sales-${this.shopName()}`);
  }

  goBack() {
    this.router.navigate(['/analytics/shops']);
  }
}
