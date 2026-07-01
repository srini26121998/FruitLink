import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import { SalesDashboardService } from './sales-dashboard.service';
import { SalesFilter } from './sales-dashboard.model';

// Chart helpers
import {
  buildChart,
  createChartConfig,
  createPieChartConfig
} from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule, SharedChartsModule],
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent {

  private readonly service = inject(SalesDashboardService);

  filter        = this.service.filter;
  stats         = this.service.salesStats;
  daily         = this.service.dailySales;
  topFruits     = this.service.topFruits;
  cityRevenue   = this.service.cityRevenue;
  categoryShare = this.service.categoryShare;
  monthCompare  = this.service.monthCompare;
  growth        = this.service.growth;

  readonly filterOptions: SalesFilter[] = ['today', 'week', 'month', 'year'];

  changeFilter(filter: SalesFilter): void {
    this.service.setFilter(filter);
  }

  getGrowthColor(v: number): string {
    return v >= 0 ? 'text-green-600' : 'text-red-600';
  }

  // ============================================================
  //                CHARTS (REFACTORED)
  // ============================================================

  /** 📈 Revenue Trend (Line Chart) */
  revenueTrendChart = computed(() =>
    createChartConfig(
      'line',
      260,
      this.daily().map(x => x.day),
      'Revenue',
      this.daily().map(x => x.value)
    )
  );

  /** 🏙 City-wise Revenue (Bar Chart) */
  cityChart = computed(() =>
    createChartConfig(
      'bar',
      260,
      this.cityRevenue().map(x => x.city),
      'Revenue',
      this.cityRevenue().map(x => x.revenue)
    )
  );

  /** 🍇 Category Share (Pie Chart) ✅ FIXED */
  categoryChart = computed(() =>
    createPieChartConfig(
      'donut', // ✅ REQUIRED
      280,
      this.categoryShare().map(x => x.category),
      this.categoryShare().map(x => x.value)
    )
  );

  /** 📊 Month-over-Month Compare (Bar Chart – multi-series) */
  monthCompareChart = computed(() => ({
    chart: buildChart('bar', 280),
    xaxis: {
      categories: this.monthCompare().map(x => x.month)
    },
    series: [
      {
        name: 'Current',
        data: this.monthCompare().map(x => x.current)
      },
      {
        name: 'Previous',
        data: this.monthCompare().map(x => x.previous)
      }
    ]
  }));

  // ============================================================
  //                EXPORT (CSV + PDF)
  // ============================================================

  exportExcel(): void {
    const rows = this.topFruits();
    const header = 'Fruit,Qty,Revenue';
    const csvBody = rows.map(r => `${r.fruit},${r.qty},${r.revenue}`).join('\n');
    const csv = header + '\n' + csvBody;

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sales-dashboard-report.csv';
    link.click();
  }

  exportPDF(): void {
    window.print(); // replace with jsPDF later
  }
}
