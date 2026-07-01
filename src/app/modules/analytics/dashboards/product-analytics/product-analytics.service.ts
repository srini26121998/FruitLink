// ⬇ Replace your service entirely with this final version
import { Injectable, signal } from '@angular/core';
import {
  ProductFilter, ProductSales, StockStatus,
  CategoryShare, ProductAnalyticsSummary
} from './product-analytics.model';

@Injectable({ providedIn:'root' })
export class ProductAnalyticsService{

  filter = signal<ProductFilter>('month');

  summary = signal<ProductAnalyticsSummary>({
    totalProducts:120,
    lowStockCount:18,
    highestSelling:'Banana',
    topRevenueProduct:'Apple'
  });

  productSales = signal<ProductSales[]>([
    { name:'Apple',  quantity:1400, revenue:48000, profitMargin:32 },
    { name:'Banana', quantity:1650, revenue:35000, profitMargin:40 },
    { name:'Mango',  quantity:920,  revenue:41000, profitMargin:37 },
    { name:'Orange', quantity:780,  revenue:28000, profitMargin:28 }
  ]);

  // 🔥 P3 Growth Analytics
  growth = signal({
    momGrowth: +14.8,
    yoyGrowth: +31,
    revenueStatus: "up", // up/down
    highlightBest: "Banana",
    highlightWorst: "Orange"
  });

  stockStatus = signal<StockStatus[]>([
    { fruit:'Apple',  inStock:340, reorderLevel:120 },
    { fruit:'Banana', inStock:95,  reorderLevel:80  },
    { fruit:'Mango',  inStock:180, reorderLevel:150 },
    { fruit:'Orange', inStock:60,  reorderLevel:100 }
  ]);

  categoryShare = signal<CategoryShare[]>([
    { category:'Citrus',  share:35 },
    { category:'Tropical',share:28 },
    { category:'Berries', share:20 },
    { category:'Seasonal',share:17 }
  ]);

  // 🔥 P4 Revenue Heatmap
  revenueHeatmap = signal([
    { category:'Citrus', revenue:46000 },
    { category:'Tropical', revenue:39000 },
    { category:'Berries', revenue:25000 },
    { category:'Seasonal', revenue:21000 },
  ]);

  setFilter(range:ProductFilter){
    this.filter.set(range);
  }
}
