import { Injectable, signal } from '@angular/core';
import { SalesDrilldownResponse } from './sales-drilldown.model';

@Injectable({ providedIn: 'root' })
export class SalesDrilldownService {

  private readonly _data = signal<SalesDrilldownResponse>({
    kpis: {
      totalOrders: 842,
      totalRevenue: 12400000,
      totalQuantityKg: 48600,

      avgOrderValue: 14720,
      avgItemsPerOrder: 6.4,

      activeCustomers: 182,
      repeatCustomerRate: 68
    },

    rows: [
      {
        orderId: 'ORD-9012',
        orderDate: '2025-01-18',

        city: 'Chennai',
        customerName: 'Sri Lakshmi Juice Center',

        productCount: 7,
        quantityKg: 120,

        orderValue: 18400,
        paymentStatus: 'PAID',
        deliveryStatus: 'DELIVERED'
      },
      {
        orderId: 'ORD-9013',
        orderDate: '2025-01-18',

        city: 'Bangalore',
        customerName: 'Fresh Hub Hotel',

        productCount: 5,
        quantityKg: 92,

        orderValue: 14200,
        paymentStatus: 'PENDING',
        deliveryStatus: 'IN_TRANSIT'
      }
    ]
  });

  readonly data = this._data.asReadonly();
}
