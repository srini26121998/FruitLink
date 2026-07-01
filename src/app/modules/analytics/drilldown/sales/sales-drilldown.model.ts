/* =========================================================
   Sales Drilldown – FINAL MODELS
   Domain: B2B Wholesale
   ========================================================= */

export interface SalesDrilldownKpis {
  totalOrders: number;
  totalRevenue: number;
  totalQuantityKg: number;

  avgOrderValue: number;
  avgItemsPerOrder: number;

  activeCustomers: number;
  repeatCustomerRate: number; // %
}

export interface SalesDrilldownRow {
  orderId: string;
  orderDate: string;

  city: string;
  customerName: string;

  productCount: number;
  quantityKg: number;

  orderValue: number;
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIAL';

  deliveryStatus: 'DELIVERED' | 'IN_TRANSIT' | 'CANCELLED';
}

export interface SalesDrilldownResponse {
  kpis: SalesDrilldownKpis;
  rows: SalesDrilldownRow[];
}
