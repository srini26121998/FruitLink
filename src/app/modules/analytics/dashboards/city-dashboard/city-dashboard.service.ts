import { Injectable, signal } from '@angular/core';
import {
  CityDashboardData,
  CityFilterPeriod
} from './city-dashboard.model';

@Injectable({ providedIn: 'root' })
export class CityDashboardService {

  /* -----------------------------
     FILTER STATE
  -------------------------------- */
  readonly period = signal<CityFilterPeriod>('month');

  setPeriod(p: CityFilterPeriod) {
    this.period.set(p);
  }

  /* -----------------------------
     DASHBOARD DATA (MOCK)
     Later → API integration
  -------------------------------- */
  private readonly _data = signal<CityDashboardData>({
    kpis: {
      totalCities: 6,
      totalOrders: 1840,
      totalRevenue: 12450000,
      totalQuantityKg: 48600,

      avgOrderValue: 6766,
      avgOrdersPerCity: 306
    },

    cities: [
      {
        cityId: 'CHN',
        cityName: 'Chennai',
        totalOrders: 520,
        totalRevenue: 4200000,
        totalQuantityKg: 16800,
        avgOrderValue: 8076,
        activeCustomers: 142,
        growthPercent: 12.4
      },
      {
        cityId: 'BLR',
        cityName: 'Bangalore',
        totalOrders: 460,
        totalRevenue: 3560000,
        totalQuantityKg: 14200,
        avgOrderValue: 7739,
        activeCustomers: 128,
        growthPercent: 9.1
      },
      {
        cityId: 'HYD',
        cityName: 'Hyderabad',
        totalOrders: 310,
        totalRevenue: 2140000,
        totalQuantityKg: 8800,
        avgOrderValue: 6903,
        activeCustomers: 86,
        growthPercent: -3.2
      },
      {
        cityId: 'CBE',
        cityName: 'Coimbatore',
        totalOrders: 240,
        totalRevenue: 1680000,
        totalQuantityKg: 6200,
        avgOrderValue: 7000,
        activeCustomers: 58,
        growthPercent: 6.8
      },
      {
        cityId: 'MDU',
        cityName: 'Madurai',
        totalOrders: 190,
        totalRevenue: 980000,
        totalQuantityKg: 4200,
        avgOrderValue: 5158,
        activeCustomers: 41,
        growthPercent: 4.3
      },
      {
        cityId: 'TRI',
        cityName: 'Trichy',
        totalOrders: 120,
        totalRevenue: 650000,
        totalQuantityKg: 3400,
        avgOrderValue: 5416,
        activeCustomers: 26,
        growthPercent: -1.9
      }
    ],

    trends: {
      ordersTrend: [
        { period: 'Jan', value: 480 },
        { period: 'Feb', value: 520 },
        { period: 'Mar', value: 610 },
        { period: 'Apr', value: 720 }
      ],
      revenueTrend: [
        { period: 'Jan', value: 3100000 },
        { period: 'Feb', value: 3400000 },
        { period: 'Mar', value: 3900000 },
        { period: 'Apr', value: 4550000 }
      ],
      quantityTrendKg: [
        { period: 'Jan', value: 11200 },
        { period: 'Feb', value: 12400 },
        { period: 'Mar', value: 13800 },
        { period: 'Apr', value: 15200 }
      ]
    },

    revenueByCity: {
      labels: ['Chennai', 'Bangalore', 'Hyderabad', 'Coimbatore', 'Madurai', 'Trichy'],
      values: [4200000, 3560000, 2140000, 1680000, 980000, 650000]
    },

    ordersByCity: {
      labels: ['Chennai', 'Bangalore', 'Hyderabad', 'Coimbatore', 'Madurai', 'Trichy'],
      values: [520, 460, 310, 240, 190, 120]
    }
  });

  /* -----------------------------
     PUBLIC READONLY SIGNAL
  -------------------------------- */
  readonly data = this._data.asReadonly();
}
