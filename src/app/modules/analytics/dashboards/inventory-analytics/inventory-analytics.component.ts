// src/app/modules/analytics/dashboards/inventory-analytics/inventory-analytics.component.ts

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';

import { InventoryAnalyticsService } from './inventory-analytics.service';

import {
  createChartConfig,
  createPieChartConfig,
  buildChart
} from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-inventory-analytics',
  standalone: true,
  imports: [CommonModule, SharedChartsModule],
  templateUrl: './inventory-analytics.component.html',
  styleUrls: ['./inventory-analytics.component.css']
})
export class InventoryAnalyticsComponent {

  svc = inject(InventoryAnalyticsService);

  filter = this.svc.filter;
  summary = this.svc.summary;
  stockLevels = this.svc.stockLevels;
  categoryStock = this.svc.categoryStock;
  restockTrend = this.svc.restockTrend;
  warehouseDistribution = this.svc.warehouseDistribution;

  filterOptions = ['today', 'week', 'month', 'year'];

  setFilter(v: any) {
    this.svc.setFilter(v);
  }

  /** 📦 Stock Levels Chart (bar) */
  stockChart = computed(() =>
    createChartConfig(
      'bar',
      260,
      this.stockLevels().map(s => s.product),
      'Stock Qty',
      this.stockLevels().map(s => s.quantity)
    )
  );

  /** 📊 Category Distribution (pie) */
  categoryChart = computed(() =>
    createPieChartConfig(
      'pie',
      260,
      this.categoryStock().map(c => c.category),
      this.categoryStock().map(c => c.items)
    )
  );

  /** 🔄 Restock Trend (line) */
  restockChart = computed(() =>
    createChartConfig(
      'line',
      260,
      this.restockTrend().map(t => t.month),
      'Restocked',
      this.restockTrend().map(t => t.restocked)
    )
  );

  /** 🏭 Warehouse Distribution (bar) */
  warehouseChart = computed(() =>
    createChartConfig(
      'bar',
      260,
      this.warehouseDistribution().map(w => w.warehouse),
      'Items',
      this.warehouseDistribution().map(w => w.items)
    )
  );
}
