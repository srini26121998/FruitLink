// src/app/modules/analytics/dashboards/delivery-analytics/delivery-analytics.model.ts

export type DeliveryFilter = 'today' | 'week' | 'month' | 'year';

export interface DeliverySummary {
  totalDeliveries: number;
  delivered: number;
  inTransit: number;
  pending: number;
  failed: number;
  damaged: number;
}

export interface DeliveryPerformance {
  date: string;
  delivered: number;
  failed: number;
  damaged: number;
}

export interface DriverRanking {
  driver: string;
  completed: number;
  rating: number; // 1–5
}

export interface DeliveryByCity {
  city: string;
  deliveries: number;
}

export interface AvgDeliveryTime {
  day: string;
  duration: number; // mins
}
