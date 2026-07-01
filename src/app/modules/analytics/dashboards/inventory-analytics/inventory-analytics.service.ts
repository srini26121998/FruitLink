// src/app/modules/analytics/dashboards/inventory-analytics/inventory-analytics.service.ts

import { Injectable, signal } from '@angular/core';
import {
  InventoryFilter,
  InventorySummary,
  StockLevel,
  CategoryStock,
  RestockTrend,
  WarehouseDistribution
} from './inventory-analytics.model';

@Injectable({ providedIn: 'root' })
export class InventoryAnalyticsService {

  filter = signal<InventoryFilter>('month');

  summary = signal<InventorySummary>({
    totalItems: 5400,
    lowStock: 320,
    outOfStock: 80,
    stockValue: 1250000
  });

  stockLevels = signal<StockLevel[]>([
    { product: 'Mango', quantity: 420 },
    { product: 'Apple', quantity: 310 },
    { product: 'Banana', quantity: 500 },
    { product: 'Orange', quantity: 260 },
    { product: 'Grapes', quantity: 180 }
  ]);

  categoryStock = signal<CategoryStock[]>([
    { category: 'Fruits', items: 2100 },
    { category: 'Vegetables', items: 1800 },
    { category: 'Groceries', items: 1500 }
  ]);

  restockTrend = signal<RestockTrend[]>([
    { month: 'Jan', restocked: 420 },
    { month: 'Feb', restocked: 460 },
    { month: 'Mar', restocked: 500 },
    { month: 'Apr', restocked: 620 },
    { month: 'May', restocked: 580 }
  ]);

  warehouseDistribution = signal<WarehouseDistribution[]>([
    { warehouse: 'Chennai', items: 2100 },
    { warehouse: 'Bangalore', items: 1700 },
    { warehouse: 'Hyderabad', items: 1200 },
    { warehouse: 'Coimbatore', items: 400 }
  ]);

  setFilter(filter: InventoryFilter) {
    this.filter.set(filter);
  }
}
