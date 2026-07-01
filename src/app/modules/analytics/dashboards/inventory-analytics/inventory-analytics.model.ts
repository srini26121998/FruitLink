// src/app/modules/analytics/dashboards/inventory-analytics/inventory-analytics.model.ts

export type InventoryFilter = 'today' | 'week' | 'month' | 'year';

export interface InventorySummary {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  stockValue: number;
}

export interface StockLevel {
  product: string;
  quantity: number;
}

export interface CategoryStock {
  category: string;
  items: number;
}

export interface RestockTrend {
  month: string;
  restocked: number;
}

export interface WarehouseDistribution {
  warehouse: string;
  items: number;
}
