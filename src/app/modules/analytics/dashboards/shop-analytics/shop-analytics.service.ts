import { Injectable, signal } from '@angular/core';
import {
  ShopFilter,
  ShopSummary,
  ShopSales,
  OrdersTrend,
  TopShops,
  CityShopCount,
} from './shop-analytics.model';

/**
 * Enterprise Analytics Service
 * ------------------------------
 * Phase 1 + Phase 2 Ready
 *
 * Features:
 *  ✔ Summary KPIs
 *  ✔ Revenue Comparison
 *  ✔ Orders Trend
 *  ✔ Top Shops with ratings
 *  ✔ City Shop Distribution
 *  ✔ Growth Analytics (MoM, YoY, Active %)
 *  ✔ Revenue Heatmap Data
 *  ✔ Reactive Filter using Signals
 *
 * Future Expand:
 *  - API Integration
 *  - Compare Multiple Shops
 *  - AI Forecasting
 *  - Custom Date Range Filter
 */

@Injectable({ providedIn: 'root' })
export class ShopAnalyticsService {

  // 🔹 Current filter state
  filter = signal<ShopFilter>('month'); // default view

  // 🔹 Summary KPI Data
  summary = signal<ShopSummary>({
    totalShops: 140,
    activeShops: 120,
    inactiveShops: 20,
    newThisMonth: 18,
  });

  // 🔹 Revenue + Orders for each shop
  shopSales = signal<ShopSales[]>([
    { shop: 'Fresh Mart', orders: 180, revenue: 48000 },
    { shop: 'Fruit Express', orders: 160, revenue: 42000 },
    { shop: 'Organic Hub', orders: 140, revenue: 35000 },
    { shop: 'Green Basket', orders: 120, revenue: 30000 },
    { shop: 'Daily Fruits', orders: 110, revenue: 25000 },
  ]);

  // 🔹 Trend chart (weekly view)
  ordersTrend = signal<OrdersTrend[]>([
    { day: 'Mon', orders: 45 },
    { day: 'Tue', orders: 52 },
    { day: 'Wed', orders: 38 },
    { day: 'Thu', orders: 70 },
    { day: 'Fri', orders: 92 },
    { day: 'Sat', orders: 87 },
    { day: 'Sun', orders: 55 },
  ]);

  // 🔹 Top Shops List
  topShops = signal<TopShops[]>([
    { shop: 'Fresh Mart', rating: 4.9, orders: 180, revenue: 48000 },
    { shop: 'Fruit Express', rating: 4.8, orders: 160, revenue: 42000 },
    { shop: 'Organic Hub', rating: 4.6, orders: 140, revenue: 35000 },
    { shop: 'Green Basket', rating: 4.4, orders: 120, revenue: 30000 },
    { shop: 'Daily Fruits', rating: 4.3, orders: 110, revenue: 25000 },
  ]);

  // 🔹 City wise shop count
  cityShopCount = signal<CityShopCount[]>([
    { city: 'Chennai', shops: 55 },
    { city: 'Bangalore', shops: 40 },
    { city: 'Hyderabad', shops: 28 },
    { city: 'Coimbatore', shops: 17 },
    { city: 'Madurai', shops: 12 },
  ]);

  // 🔹 Growth Analytics % (P3)
  growth = signal({
    mom: 12.5,         // Month over Month revenue growth
    yoy: 28.4,         // Year over Year growth
    activeRate: 86,    // % of total shops active
  });

  // 🔹 Revenue Heatmap (P4)
  revenueHeatmap = signal([
    { city: 'Chennai', revenue: 65000 },
    { city: 'Bangalore', revenue: 52000 },
    { city: 'Hyderabad', revenue: 44000 },
    { city: 'Coimbatore', revenue: 27000 },
    { city: 'Madurai', revenue: 18000 },
  ]);

  // 🔹 Filter handler (future -> call backend with date range)
  setFilter(range: ShopFilter) {
    this.filter.set(range);

    // TODO: backend integration sample:
    // this.http.get(`/api/analytics/shops?range=${range}`)
    //  .subscribe(res => { this.shopSales.set(res.sales) });
  }
}
