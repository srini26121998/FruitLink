import { Injectable, signal, computed } from '@angular/core';
import {
  CustomerInsights,
  CustomerFilter,
  CustomerKpiSummary,
  CustomerTrends,
  SegmentDistribution,
  RfmOverview,
  ClvTrendPoint,
  TopCustomerSummary
} from './customer-insights.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerInsightsService {

  /* -----------------------------------
     1️⃣ FILTER STATE
  ------------------------------------ */
  private readonly _filter = signal<CustomerFilter>('month');
  readonly filter = this._filter.asReadonly();

  setFilter(filter: CustomerFilter) {
    this._filter.set(filter);
    // later: trigger API refetch
  }

  /* -----------------------------------
     2️⃣ KPI SUMMARY (MOCK)
  ------------------------------------ */
  private readonly _kpis = signal<CustomerKpiSummary>({
    totalCustomers: 4200,
    activeCustomers: 3100,
    activeRate: 73.8,

    newCustomers: 180,
    churnRate: 3.2,

    atRiskCustomers: 420,
    highValueCustomers: 260,

    totalRevenue: 8_750_000,
    avgRevenuePerCustomer: 2083,

    avgOrderFrequencyDays: 6.5,
    totalQuantityKg: 128_500
  });

  readonly kpis = this._kpis.asReadonly();

  /* -----------------------------------
     3️⃣ TRENDS (CHART READY)
  ------------------------------------ */
  private readonly _trends = signal<CustomerTrends>({
    customerGrowth: [
      { period: 'Jan', value: 3200 },
      { period: 'Feb', value: 3400 },
      { period: 'Mar', value: 3600 },
      { period: 'Apr', value: 3900 },
      { period: 'May', value: 4200 }
    ],
    orderFrequency: [
      { period: 'Jan', value: 5.2 },
      { period: 'Feb', value: 5.6 },
      { period: 'Mar', value: 6.1 },
      { period: 'Apr', value: 6.3 },
      { period: 'May', value: 6.5 }
    ],
    revenueTrend: [
      { period: 'Jan', value: 620000 },
      { period: 'Feb', value: 710000 },
      { period: 'Mar', value: 780000 },
      { period: 'Apr', value: 840000 },
      { period: 'May', value: 910000 }
    ]
  });

  readonly trends = this._trends.asReadonly();

  /* -----------------------------------
     4️⃣ SEGMENT DISTRIBUTION
  ------------------------------------ */
  private readonly _segments = signal<SegmentDistribution[]>([
    { segment: 'CHAMPION', customerCount: 260, percentage: 6.2 },
    { segment: 'LOYAL', customerCount: 980, percentage: 23.3 },
    { segment: 'POTENTIAL', customerCount: 1450, percentage: 34.5 },
    { segment: 'AT_RISK', customerCount: 420, percentage: 10.0 },
    { segment: 'LOST', customerCount: 1090, percentage: 26.0 }
  ]);

  readonly segments = this._segments.asReadonly();

  /* -----------------------------------
     5️⃣ RFM OVERVIEW (SUMMARY)
  ------------------------------------ */
  readonly rfmOverview = computed<RfmOverview>(() => {
    const segments = this._segments();
    const find = (s: string) =>
      segments.find(x => x.segment === s)?.customerCount ?? 0;

    return {
      champions: find('CHAMPION'),
      loyal: find('LOYAL'),
      potential: find('POTENTIAL'),
      atRisk: find('AT_RISK'),
      lost: find('LOST')
    };
  });

  /* -----------------------------------
     6️⃣ CLV TREND
  ------------------------------------ */
  private readonly _clvTrend = signal<ClvTrendPoint[]>([
    { period: 'Jan', avgClv: 18000 },
    { period: 'Feb', avgClv: 19200 },
    { period: 'Mar', avgClv: 20500 },
    { period: 'Apr', avgClv: 21800 },
    { period: 'May', avgClv: 23100 }
  ]);

  readonly clvTrend = this._clvTrend.asReadonly();

  /* -----------------------------------
     7️⃣ TOP CUSTOMERS (DRILLDOWN ENTRY)
  ------------------------------------ */
  private readonly _topCustomers = signal<TopCustomerSummary[]>([
    {
      customerId: 'CUST-001',
      customerName: 'Sri Lakshmi Juice Center',
      totalOrders: 96,
      totalQuantityKg: 4800,
      totalSpent: 640000,
      riskLevel: 'LOW'
    },
    {
      customerId: 'CUST-014',
      customerName: 'Fresh Fruit Mart',
      totalOrders: 74,
      totalQuantityKg: 3900,
      totalSpent: 510000,
      riskLevel: 'MEDIUM'
    },
    {
      customerId: 'CUST-033',
      customerName: 'Green Valley Traders',
      totalOrders: 52,
      totalQuantityKg: 2700,
      totalSpent: 360000,
      riskLevel: 'HIGH'
    }
  ]);

  readonly topCustomers = this._topCustomers.asReadonly();

  /* -----------------------------------
     8️⃣ AGGREGATE VIEW MODEL
     (Optional but ENTERPRISE-LEVEL)
  ------------------------------------ */
  readonly insights = computed<CustomerInsights>(() => ({
    filter: this._filter(),
    kpis: this._kpis(),
    trends: this._trends(),
    segments: this._segments(),
    rfmOverview: this.rfmOverview(),
    clvTrend: this._clvTrend(),
    topCustomers: this._topCustomers()
  }));
}
