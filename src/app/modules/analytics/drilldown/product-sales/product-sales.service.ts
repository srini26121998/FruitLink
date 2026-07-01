import { Injectable, signal } from '@angular/core';

import {
  ProductSalesFilter,
  ProductSummary,
  ProductSalesItem,
  ProductTrendItem
} from './product-sales.model';

@Injectable({ providedIn: 'root' })
export class ProductSalesService {

  // 🔹 filter (today / week / month / year)
  filter = signal<ProductSalesFilter>('month');

  // 🔹 summary KPI values
  summary = signal<ProductSummary>({
    totalProducts: 5,
    previousProducts: 4,
    totalRevenue: 137000,
    previousRevenue: 110000,
    highestSelling: 'Mango',
    topRevenueProduct: 'Mango'
  });

  // 🔹 product-level data
  products = signal<ProductSalesItem[]>([
    { product: 'Mango', orders: 420, revenue: 42000, percentage: 32 },
    { product: 'Apple', orders: 350, revenue: 35000, percentage: 26 },
    { product: 'Banana', orders: 260, revenue: 24000, percentage: 18 },
    { product: 'Orange', orders: 190, revenue: 21000, percentage: 14 },
    { product: 'Grapes', orders: 160, revenue: 15000, percentage: 10 }
  ]);

  // 🔹 sales trend
  salesTrend = signal<ProductTrendItem[]>([
    { month: 'Jan', sales: 120 },
    { month: 'Feb', sales: 160 },
    { month: 'Mar', sales: 210 },
    { month: 'Apr', sales: 290 },
    { month: 'May', sales: 310 }
  ]);

  // 🔹 filter handler
  setFilter(range: ProductSalesFilter) {
    this.filter.set(range);

    // future → API call to fetch data:
    // this.http.get(`/api/product-sales?shop=X&filter=${range}`)
  }
}
