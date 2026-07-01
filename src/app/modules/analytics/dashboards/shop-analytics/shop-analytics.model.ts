export type ShopFilter = 'today' | 'week' | 'month' | 'year';

export interface ShopSummary {
  totalShops: number;
  activeShops: number;
  inactiveShops: number;
  newThisMonth: number;
}

export interface ShopSales {
  shop: string;
  orders: number;
  revenue: number;
}

export interface OrdersTrend {
  day: string;
  orders: number;
}

export interface TopShops {
  shop: string;
  rating: number;
  orders: number;
  revenue: number;
}

export interface CityShopCount {
  city: string;
  shops: number;
}
