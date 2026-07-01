// src/app/modules/analytics/dashboards/sales-dashboard/sales-dashboard.model.ts

export type SalesFilter = 'today' | 'week' | 'month' | 'year';

export interface SalesStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  repeatCustomers: number;
}

export interface DailySalesPoint {
  day: string;   // e.g. 'Mon'
  value: number; // revenue or order count
}

export interface TopFruit {
  fruit: string;
  qty: number;
  revenue: number;
}

export interface CityRevenue {
  city: string;
  revenue: number;
}

export interface CategoryShare {
  category: string;
  value: number; // percentage or relative value
}

export interface MonthCompare {
  month: string;     // 'Jan', 'Feb', ...
  current: number;   // current year revenue
  previous: number;  // previous year revenue
}
