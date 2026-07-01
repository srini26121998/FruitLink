// src/app/modules/analytics/dashboards/product-analytics/product-analytics.model.ts

export type ProductFilter = 'today' | 'week' | 'month' | 'year';

export interface ProductSales {
  name: string;
  quantity: number;     // units/kg sold
  revenue: number;      // total revenue
  profitMargin: number; // %
}

export interface StockStatus {
  fruit: string;
  inStock: number;      // current stock
  reorderLevel: number; // threshold
}

export interface CategoryShare {
  category: string;
  share: number; // in %
}

export interface ProductAnalyticsSummary {
  totalProducts: number;
  lowStockCount: number;
  highestSelling: string;
  topRevenueProduct: string;
}
