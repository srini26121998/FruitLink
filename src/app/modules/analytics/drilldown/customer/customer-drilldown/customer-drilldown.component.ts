import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { SharedChartsModule } from '../../../../../shared/charts/shared-charts.module';
import {
  createChartConfig,
  createPieChartConfig
} from '../../../../../shared/charts/chart.utils';
import { CustomerDrilldownService } from '../customer-drilldown.service';
import { AnalyticsExportService } from '../../../export/analytics-export.service';

@Component({
  selector: 'app-customer-drilldown',
  standalone: true,
  templateUrl: './customer-drilldown.component.html',
  styleUrls: ['./customer-drilldown.component.css'],
  imports: [
    CommonModule,
    TitleCasePipe,
    SharedChartsModule,
  ]
})
export class CustomerDrilldownComponent {

  private readonly service = inject(CustomerDrilldownService);
  private readonly data = this.service.data;
  private readonly exportService = inject(AnalyticsExportService);

  /* ---------------- CORE DATA ---------------- */
  readonly profile = computed(() => this.data().profile);
  readonly kpis = computed(() => this.data().kpis);
  readonly rfm = computed(() => this.data().rfm);
  readonly topProducts = computed(() => this.data().topProducts);
  readonly activities = computed(() => this.data().activities);

  /* ---------------- TAGS ---------------- */
  readonly tags = signal<string[]>([
    'High Value',
    'Frequent Buyer',
    'Wholesale Partner'
  ]);

  /* ---------------- FILTER ---------------- */
  readonly filter = signal<'month' | 'year'>('month');
  readonly filterOptions: Array<'month' | 'year'> = ['month', 'year'];

  setFilter(f: 'month' | 'year') {
    this.filter.set(f);
  }

  /* ---------------- CHARTS ---------------- */

  readonly clvChart = computed(() =>
    createChartConfig(
      'line',
      300,
      this.data().trends.revenueTrend.map(t => t.period),
      'Revenue',
      this.data().trends.revenueTrend.map(t => t.value)
    )
  );

  readonly frequencyChart = computed(() =>
    createChartConfig(
      'line',
      300,
      this.data().trends.orderCountTrend.map(t => t.period),
      'Orders',
      this.data().trends.orderCountTrend.map(t => t.value)
    )
  );

  readonly aovChart = computed(() =>
    createChartConfig(
      'line',
      300,
      this.data().trends.revenueTrend.map(t => t.period),
      'Avg Order Value',
      this.data().trends.revenueTrend.map((t, i) =>
        t.value / this.data().trends.orderCountTrend[i].value
      )
    )
  );

  readonly affinityChart = computed(() =>
    createPieChartConfig(
      'donut', // 👈 REQUIRED
      300,
      this.data().productAffinity.map(p => p.productName),
      this.data().productAffinity.map(p => p.totalRevenue)
    )
  );

  /* ---------------- UI HELPERS ---------------- */

  getRfmColor(value: number): string {
    if (value >= 15) return 'text-green-600';
    if (value >= 7) return 'text-yellow-600';
    return 'text-red-600';
  }

  getSegmentColor(segment: string): string {
    switch (segment) {
      case 'CHAMPION': return 'text-green-600';
      case 'LOYAL': return 'text-blue-600';
      case 'POTENTIAL': return 'text-yellow-600';
      case 'AT_RISK': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  }

  getChipColor(_: string): string {
    return 'bg-blue-100 text-blue-700';
  }

  /* ---------------- EXPORT (STUBS) ---------------- */
  exportExcel() {
  this.exportService.exportExcel(
    this.topProducts(),          // data (array of objects)
    'customer-top-products'      // file name
  );
}

exportPDF() {
  this.exportService.exportPDF(
    'customer-drilldown-report', // HTML element id
    'customer-drilldown-report'
  );
}

}
