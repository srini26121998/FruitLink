import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ShopAnalyticsService } from './shop-analytics.service';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { createChartConfig } from '../../../../shared/charts/chart.utils';
import { AnalyticsExportService } from '../../export/analytics-export.service';
import { CityShopCount, ShopFilter } from './shop-analytics.model';

@Component({
  selector: 'app-shop-analytics',
  standalone: true,
  imports: [
    CommonModule,          // ✅ ngClass, pipes
    SharedChartsModule,    // ✅ Apex charts
    KpiCardComponent       // ✅ <kpi-card>
  ],
  templateUrl: './shop-analytics.component.html',
  styleUrls: ['./shop-analytics.component.css'],
})
export class ShopAnalyticsComponent {

  // -------------------------------------------------
  // Services
  // -------------------------------------------------
  private readonly svc = inject(ShopAnalyticsService);
  private readonly exportSvc = inject(AnalyticsExportService);
  private readonly router = inject(Router);

  // -------------------------------------------------
  // Signals from Service
  // -------------------------------------------------
  readonly filter  = this.svc.filter;
  readonly summary = this.svc.summary;
  readonly sales   = this.svc.shopSales;
  readonly trend   = this.svc.ordersTrend;
  readonly top     = this.svc.topShops;
  readonly city    = this.svc.cityShopCount;
  readonly growth  = this.svc.growth;
  readonly heatmap = this.svc.revenueHeatmap;

  // -------------------------------------------------
  // UI State
  // -------------------------------------------------
  readonly filterOptions: ShopFilter[] = ['today', 'week', 'month', 'year'];
  readonly search = signal<string>('');

  // -------------------------------------------------
  // KPI Computed (USED BY KPI CARD)
  // -------------------------------------------------
  readonly totalShops = computed(() => this.summary().totalShops);

  readonly activeShops = computed(() => this.summary().activeShops);

  readonly avgOrdersPerShop = computed(() => {
    const shops = this.top();
    if (!shops.length) return 0;
    return Math.round(
      shops.reduce((sum, s) => sum + s.orders, 0) / shops.length
    );
  });

  readonly avgRevenuePerShop = computed(() => {
    const shops = this.top();
    if (!shops.length) return 0;
    return Math.round(
      shops.reduce((sum, s) => sum + s.revenue, 0) / shops.length
    );
  });

  // -------------------------------------------------
  // Search Filter
  // -------------------------------------------------
  readonly filteredTop = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.top();
    return this.top().filter(s =>
      s.shop.toLowerCase().includes(q)
    );
  });

  // -------------------------------------------------
  // Charts
  // -------------------------------------------------
  readonly shopTrendChart = computed(() =>
    createChartConfig(
      'line',                                   // ✅ ONLY line/bar allowed
      260,
      this.trend().map(x => x.day),
      'Orders',
      this.trend().map(x => x.orders)
    )
  );

  readonly revenueChart = computed(() =>
    createChartConfig(
      'bar',
      260,
      this.sales().map(x => x.shop),
      'Revenue',
      this.sales().map(x => x.revenue)
    )
  );

  // -------------------------------------------------
  // City Percentage
  // -------------------------------------------------
  readonly totalShopsInCities = computed(() =>
    this.city().reduce((sum, c) => sum + c.shops, 0)
  );

  getCityPercentage(c: CityShopCount): number {
    const total = this.totalShopsInCities();
    return total ? (c.shops / total) * 100 : 0;
  }

  // -------------------------------------------------
  // Actions
  // -------------------------------------------------
  setFilter(v: ShopFilter): void {
    this.svc.setFilter(v);
  }

  exportExcel(): void {
    this.exportSvc.exportExcel(this.sales(), 'shop-analytics');
  }

  exportPDF(): void {
    this.exportSvc.exportPDF('shop-analytics-report', 'shop-analytics');
  }

  openProductAnalytics(shop: string): void {
    this.router.navigate(['/analytics/products'], {
      queryParams: { shop }
    });
  }

  getGrowthColor(v: number): string {
    return v >= 0 ? 'text-green-600' : 'text-red-600';
  }
}
