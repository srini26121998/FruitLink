import { Injectable, signal } from '@angular/core';
import { CustomerDrilldown } from './customer-drilldown.model.';

@Injectable({ providedIn: 'root' })
export class CustomerDrilldownService {

  private readonly _data = signal<CustomerDrilldown>({
    profile: {
      id: 'CUST-001',
      businessName: 'Sri Lakshmi Juice Center',
      contactPerson: 'Ramesh',
      email: 'srila@example.com',
      phone: '9876543210',
      customerType: 'JUICE_SHOP',
      joinedAt: '2023-01-12',
      status: 'ACTIVE',
      location: {
        city: 'Chennai',
        area: 'T Nagar',
        deliveryRoute: 'Route A'
      }
    },

    kpis: {
      totalOrders: 124,
      totalQuantityKg: 5200,
      totalSpent: 680000,
      avgOrderValue: 5480,
      avgOrderFrequencyDays: 5.2,
      creditLimit: 100000,
      outstandingAmount: 12000
    },

    clv: {
      firstOrderDate: '2023-01-12',
      lastOrderDate: '2025-01-10',
      lifetimeOrders: 124,
      lifetimeRevenue: 680000,
      avgMonthlyRevenue: 28000,
      expectedAnnualValue: 336000
    },

    rfm: {
      recencyDays: 3,
      frequencyOrders: 18,
      monetaryValue: 98000,
      score: 5,
      segment: 'CHAMPION'
    },

    trends: {
      orderCountTrend: [
        { period: 'Jan', value: 12 },
        { period: 'Feb', value: 18 }
      ],
      revenueTrend: [
        { period: 'Jan', value: 56000 },
        { period: 'Feb', value: 82000 }
      ],
      quantityTrendKg: [
        { period: 'Jan', value: 480 },
        { period: 'Feb', value: 620 }
      ]
    },

    topProducts: [
      {
        productId: 'P1',
        productName: 'Apple',
        totalOrders: 34,
        totalQuantityKg: 980,
        totalAmount: 124000
      }
    ],

    productAffinity: [
      {
        productId: 'P1',
        productName: 'Apple',
        totalQuantityKg: 980,
        totalRevenue: 124000,
        repeatPurchaseRate: 82
      }
    ],

    activities: [
      {
        timestamp: '2025-01-10',
        type: 'ORDER_DELIVERED',
        description: 'Order #ORD-991 delivered',
        amount: 8200
      }
    ]
  });

  readonly data = this._data.asReadonly();
}
