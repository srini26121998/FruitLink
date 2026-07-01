export interface DeliveryRoute {
  routeId: string;
  city: string;

  orderIds: string[];

  estimatedDistanceKm: number;
  estimatedTimeMinutes: number;

  optimized: boolean;

  createdAt: string;
}
