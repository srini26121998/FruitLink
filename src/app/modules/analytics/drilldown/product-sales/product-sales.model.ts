export type ProductSalesFilter = 'today' | 'week' | 'month' | 'year';

export interface ProductSummary {
  totalProducts: number;
  previousProducts: number;
  totalRevenue: number;
  previousRevenue: number;
  highestSelling: string;
  topRevenueProduct: string;
}

export interface ProductSalesItem {
  product: string;
  orders: number;
  revenue: number;
  percentage: number;
}

export interface ProductTrendItem {
  month: string;
  sales: number;
}
