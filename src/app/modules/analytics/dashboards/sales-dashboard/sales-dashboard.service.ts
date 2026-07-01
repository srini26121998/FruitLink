// src/app/modules/analytics/dashboards/sales-dashboard/sales-dashboard.service.ts

import { Injectable, signal } from '@angular/core';
import {
  SalesFilter,
  SalesStats,
  DailySalesPoint,
  TopFruit,
  CityRevenue,
  CategoryShare,
  MonthCompare
} from './sales-dashboard.model';

@Injectable({ providedIn: 'root' })
export class SalesDashboardService {

  // Active range filter
  readonly filter = signal<SalesFilter>('month');

  // High-level summary stats
  readonly salesStats = signal<SalesStats>({
    totalRevenue: 124_500,
    totalOrders: 875,
    avgOrderValue: 145,
    repeatCustomers: 42
  });

  // Daily/weekly trend points
  readonly dailySales = signal<DailySalesPoint[]>([
    { day: 'Mon', value: 1200 },
    { day: 'Tue', value: 2100 },
    { day: 'Wed', value: 950 },
    { day: 'Thu', value: 2500 },
    { day: 'Fri', value: 3100 },
    { day: 'Sat', value: 2800 },
    { day: 'Sun', value: 1600 }
  ]);

  // Top fruits by revenue
  readonly topFruits = signal<TopFruit[]>([
    { fruit: 'Apple',  qty: 850, revenue: 38_000 },
    { fruit: 'Mango',  qty: 620, revenue: 33_000 },
    { fruit: 'Banana', qty: 740, revenue: 22_500 },
    { fruit: 'Orange', qty: 510, revenue: 19_000 }
  ]);

  // Revenue per city
  readonly cityRevenue = signal<CityRevenue[]>([
    { city: 'Chennai',   revenue: 56_000 },
    { city: 'Bangalore', revenue: 42_000 },
    { city: 'Hyderabad', revenue: 32_000 }
  ]);

  // P2 – Category-wise sales share
  readonly categoryShare = signal<CategoryShare[]>([
    { category: 'Citrus',   value: 30 },
    { category: 'Tropical', value: 25 },
    { category: 'Berries',  value: 20 },
    { category: 'Seasonal', value: 25 }
  ]);

  // P2 – Monthly comparison (current vs previous)
  readonly monthCompare = signal<MonthCompare[]>([
    { month: 'Jan', current: 40_000, previous: 30_000 },
    { month: 'Feb', current: 48_000, previous: 33_000 },
    { month: 'Mar', current: 52_000, previous: 42_000 },
  ]);

  // P3 – Growth analytics
  readonly growth = signal({
    mom: 12,            // Month over month %
    yoy: 25,            // Year over year %
    best: 'Mango',      // Best performer
    weak: 'Pineapple'   // Weak performer
  });

  // Filter handler (later you plug API here)
  setFilter(filter: SalesFilter): void {
    this.filter.set(filter);

    // Later:
    // this.http.get<SalesDashboardResponse>(`/api/analytics/sales?range=${filter}`)
    //   .subscribe(res => {
    //      this.salesStats.set(res.stats);
    //      this.dailySales.set(res.daily);
    //      this.topFruits.set(res.topFruits);
    //      this.cityRevenue.set(res.cityRevenue);
    //      this.categoryShare.set(res.categoryShare);
    //      this.monthCompare.set(res.monthCompare);
    //      this.growth.set(res.growth);
    //   });
  }
}
