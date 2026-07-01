import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import { ProductAnalyticsService } from './product-analytics.service';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { createChartConfig, createPieChartConfig } from '../../../../shared/charts/chart.utils';
import { AnalyticsExportService } from '../../export/analytics-export.service';
import { ProductFilter } from './product-analytics.model';   // ✅ IMPORTANT FIX

@Component({
  selector: 'app-product-analytics',
  standalone: true,
  imports: [CommonModule, SharedChartsModule, KpiCardComponent],
  templateUrl: './product-analytics.component.html',
  styleUrls: ['./product-analytics.component.css']
})
export class ProductAnalyticsComponent {

  // SERVICES
  svc = inject(ProductAnalyticsService);
  exportSvc = inject(AnalyticsExportService);

  // SIGNAL STATES
  filter = this.svc.filter;
  summary = this.svc.summary;
  productSales = this.svc.productSales;
  stockStatus = this.svc.stockStatus;
  categoryShare = this.svc.categoryShare;
  growth = this.svc.growth;
  heatmap = this.svc.revenueHeatmap;

  // Correct typed filter options
  filterOptions: ProductFilter[] = ['today', 'week', 'month', 'year']; // ✅ FIXED

  search = signal('');

  // STYLE HELPERS
  getGrowthColor(v: number): string {
    return v >= 0 ? 'text-green-600' : 'text-red-600';
  }

  // -----------------------------
  // CHARTS — USING UNIFIED BUILDER
  // -----------------------------

  /** PIE CHART (category share) */
  categoryChart = computed(() =>
    createPieChartConfig(
        'pie',
      300,
      this.categoryShare().map(c => c.category),
      this.categoryShare().map(c => c.share)
    )
  );

  /** LINE CHART (revenue trend) */
  revenueTrendChart = computed(() =>
    createChartConfig(
      'line',
      300,
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      'Revenue',
      [12000, 14000, 16000, 17500, 21000, 23000] // mock - backend later
    )
  );

  /** FILTERED SEARCH */
  filteredProducts = computed(() => {
    const q = this.search().toLowerCase();
    if (!q) return this.productSales();
    return this.productSales().filter(p =>
      p.name.toLowerCase().includes(q)
    );
  });

  // -----------------------------
  // ACTIONS
  // -----------------------------

  /** Correct strong typing — ProductFilter only ✔ */
  setFilter(v: ProductFilter) {
    this.svc.setFilter(v);
  }

  exportExcel() {
    this.exportSvc.exportExcel(this.productSales(), 'product-analytics');
  }

  exportPDF() {
    this.exportSvc.exportPDF('product-analytics-screen', 'product-analytics');
  }
}
