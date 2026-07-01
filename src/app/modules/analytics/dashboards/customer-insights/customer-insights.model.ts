/* =========================================================
   Customer Insights (Analytics Dashboard)
   Domain: B2B Wholesale – Fruit / Juice Distribution
   Usage: Dashboard + Entry point for Drilldown
   Status: FINAL & FROZEN
   ========================================================= */

/* -----------------------------
   Time Filters
-------------------------------- */
export type CustomerFilter = 'today' | 'week' | 'month' | 'year';

/* -----------------------------
   High-Level KPI Summary
-------------------------------- */
export interface CustomerKpiSummary {
  totalCustomers: number;
  activeCustomers: number;
  activeRate: number;            // %

  newCustomers: number;
  churnRate: number;             // %

  atRiskCustomers: number;
  highValueCustomers: number;

  totalRevenue: number;
  avgRevenuePerCustomer: number;

  avgOrderFrequencyDays: number; // B2B retention metric
  totalQuantityKg: number;       // Fruit business critical KPI
}

/* -----------------------------
   Customer Growth & Activity
-------------------------------- */
export interface CustomerTrendPoint {
  period: string;                // day | week | month
  value: number;
}

export interface CustomerTrends {
  customerGrowth: CustomerTrendPoint[];
  orderFrequency: CustomerTrendPoint[];
  revenueTrend: CustomerTrendPoint[];
}

/* -----------------------------
   Segmentation & Distribution
-------------------------------- */
export type CustomerSegment =
  | 'CHAMPION'
  | 'LOYAL'
  | 'POTENTIAL'
  | 'AT_RISK'
  | 'LOST';

export interface SegmentDistribution {
  segment: CustomerSegment;
  customerCount: number;
  percentage: number;
}

/* -----------------------------
   RFM Overview (Dashboard Level)
-------------------------------- */
export interface RfmOverview {
  champions: number;
  loyal: number;
  potential: number;
  atRisk: number;
  lost: number;
}

/* -----------------------------
   Customer Lifetime Value (Trend)
-------------------------------- */
export interface ClvTrendPoint {
  period: string;                // month / quarter
  avgClv: number;
}

/* -----------------------------
   Top Customers (Drilldown Entry)
-------------------------------- */
export interface TopCustomerSummary {
  customerId: string;            // 🔗 Drilldown link
  customerName: string;

  totalOrders: number;
  totalQuantityKg: number;
  totalSpent: number;

  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

/* -----------------------------
   Dashboard Aggregate Model
-------------------------------- */
export interface CustomerInsights {
  filter: CustomerFilter;

  kpis: CustomerKpiSummary;

  trends: CustomerTrends;

  segments: SegmentDistribution[];
  rfmOverview: RfmOverview;

  clvTrend: ClvTrendPoint[];

  topCustomers: TopCustomerSummary[];
}
