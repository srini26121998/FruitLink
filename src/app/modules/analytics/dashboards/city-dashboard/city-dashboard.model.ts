/* =========================================================
   City Dashboard Models
   Domain: B2B Wholesale Analytics
   Status: FINAL – API READY
   ========================================================= */

/* -----------------------------
   City KPI Card (Top Summary)
-------------------------------- */
export interface CityKpis {
  totalCities: number;
  totalOrders: number;
  totalRevenue: number;
  totalQuantityKg: number;

  avgOrderValue: number;
  avgOrdersPerCity: number;
}

/* -----------------------------
   City Level Summary (Table)
-------------------------------- */
export interface CitySummary {
  cityId: string;
  cityName: string;

  totalOrders: number;
  totalRevenue: number;
  totalQuantityKg: number;

  avgOrderValue: number;
  activeCustomers: number;

  growthPercent: number; // MoM or YoY
}

/* -----------------------------
   City Trend (Charts)
-------------------------------- */
export interface CityTrendPoint {
  period: string; // month / week
  value: number;
}

export interface CityTrends {
  ordersTrend: CityTrendPoint[];
  revenueTrend: CityTrendPoint[];
  quantityTrendKg: CityTrendPoint[];
}

/* -----------------------------
   Distribution Charts
-------------------------------- */
export interface CityDistribution {
  labels: string[];   // city names
  values: number[];   // revenue / orders
}

/* -----------------------------
   Filters
-------------------------------- */
export type CityFilterPeriod = 'week' | 'month' | 'year';

/* -----------------------------
   Dashboard Aggregate
-------------------------------- */
export interface CityDashboardData {
  kpis: CityKpis;

  cities: CitySummary[];

  trends: CityTrends;

  revenueByCity: CityDistribution;
  ordersByCity: CityDistribution;
}
