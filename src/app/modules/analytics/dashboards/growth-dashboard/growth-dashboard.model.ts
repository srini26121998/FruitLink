// src/app/modules/analytics/dashboards/growth-dashboard/growth-dashboard.model.ts

export type GrowthFilter = 'today' | 'week' | 'month' | 'year';

export interface GrowthSummary {
  revenueGrowth: number;
  orderGrowth: number;
  customerGrowth: number;
  retentionRate: number;
}

export interface RevenueTrend {
  month: string;
  revenue: number;
}

export interface RegionPerformance {
  region: string;
  revenue: number;
  growth: number;
}

export interface ProfitabilityStat {
  label: string;
  value: number;
}
