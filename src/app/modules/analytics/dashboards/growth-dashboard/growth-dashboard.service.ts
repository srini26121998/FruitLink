// src/app/modules/analytics/dashboards/growth-dashboard/growth-dashboard.service.ts

import { Injectable, signal } from '@angular/core';
import {
  GrowthFilter,
  GrowthSummary,
  RevenueTrend,
  RegionPerformance,
  ProfitabilityStat
} from './growth-dashboard.model';

@Injectable({ providedIn: 'root' })
export class GrowthDashboardService {

  filter = signal<GrowthFilter>('month');

  summary = signal<GrowthSummary>({
    revenueGrowth: 18.5,
    orderGrowth: 14.2,
    customerGrowth: 11.8,
    retentionRate: 72
  });

  revenueTrend = signal<RevenueTrend[]>([
    { month: 'Jan', revenue: 120000 },
    { month: 'Feb', revenue: 138000 },
    { month: 'Mar', revenue: 150000 },
    { month: 'Apr', revenue: 165000 },
    { month: 'May', revenue: 178000 },
    { month: 'Jun', revenue: 190000 }
  ]);

  regionPerformance = signal<RegionPerformance[]>([
    { region: 'Chennai', revenue: 82000, growth: 22 },
    { region: 'Bangalore', revenue: 76000, growth: 18 },
    { region: 'Hyderabad', revenue: 63000, growth: 14 },
    { region: 'Coimbatore', revenue: 42000, growth: 12 }
  ]);

  profitability = signal<ProfitabilityStat[]>([
    { label: 'Gross Profit', value: 240000 },
    { label: 'Net Profit', value: 170000 },
    { label: 'Operating Cost', value: 70000 }
  ]);

  setFilter(f: GrowthFilter) {
    this.filter.set(f);

    // Later with API
    // this.http.get(`/api/growth?range=${f}`).subscribe(res => {...})
  }
}
