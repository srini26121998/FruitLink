import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import { DeliveryAnalyticsService } from './delivery-analytics.service';
import { DeliveryFilter } from './delivery-analytics.model';
import { buildChart, createChartConfig, createPieChartConfig } from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-delivery-analytics',
  standalone: true,
  imports: [CommonModule, SharedChartsModule],
  templateUrl: './delivery-analytics.component.html',
  styleUrls: ['./delivery-analytics.component.css']
})
export class DeliveryAnalyticsComponent {

  svc = inject(DeliveryAnalyticsService);

  filter = this.svc.filter;
  summary = this.svc.summary;
  performance = this.svc.performance;
  drivers = this.svc.drivers;
  cities = this.svc.deliveriesByCity;
  avgTime = this.svc.avgDeliveryTime;

  filterOptions: DeliveryFilter[] = ['today', 'week', 'month', 'year'];

  // ---------------------------
  //  DELIVERY PERFORMANCE CHART
  // ---------------------------
  deliveryChart = computed(() =>
    createChartConfig(
      'line',
      280,
      this.performance().map(p => p.date),
      'Delivered',
      this.performance().map(p => p.delivered)
    )
  );

  failedChart = computed(() =>
    createChartConfig(
      'line',
      280,
      this.performance().map(p => p.date),
      'Failed',
      this.performance().map(p => p.failed)
    )
  );

  damagedChart = computed(() =>
    createChartConfig(
      'line',
      280,
      this.performance().map(p => p.date),
      'Damaged',
      this.performance().map(p => p.damaged)
    )
  );

  // ---------------------------
  //  AVERAGE DELIVERY TIME CHART
  // ---------------------------
  avgTimeChart = computed(() =>
    createChartConfig(
      'line',
      260,
      this.avgTime().map(x => x.day),
      'Minutes',
      this.avgTime().map(x => x.duration)
    )
  );

  // ---------------------------
  //  CITY SHARE PIE CHART
  // ---------------------------
  cityShareChart = computed(() =>
    createPieChartConfig(
      'pie',
      300,
      this.cities().map(c => c.city),
      this.cities().map(c => c.deliveries)
    )
  );

  // ---------------------------
  //  CITY SHARE %
  // ---------------------------
  totalCityDeliveries = computed(() =>
    this.cities().reduce((sum, c) => sum + c.deliveries, 0)
  );

  getCityPercent(deliveries: number): number {
    const total = this.totalCityDeliveries();
    return total === 0 ? 0 : Math.round((deliveries / total) * 100);
  }

  // ---------------------------
  setFilter(v: DeliveryFilter) {
    this.svc.setFilter(v);
  }
}
