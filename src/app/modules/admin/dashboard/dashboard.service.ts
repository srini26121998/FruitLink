import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  salesStats = signal({
    today: 42000,
    thisWeek: 286000,
    thisMonth: 1124000,
    totalShops: 118,
  });

  topFruits = signal([
    { name: 'Apple', qty: 5200 },
    { name: 'Banana', qty: 4300 },
    { name: 'Orange', qty: 3800 },
    { name: 'Tomato', qty: 2700 },
    { name: 'Potato', qty: 1900 }
  ]);

  weeklyOrders = signal({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [120, 180, 220, 210, 260, 300, 190]
  });

  revenueTrend = signal({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [280000, 325000, 310000, 360000]
  });

  deliveryPerformance = signal({
    delivered: 420,
    delayed: 18,
    cancelled: 4,
  });
}
