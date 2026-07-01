import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShopDashboardService {

  shopInfo = signal({
    shopName: "Sri Murugan Stores",
    owner: "Ramesh Kumar",
    nextDelivery: "Tomorrow 7 AM - 11 AM",
    totalOrders: 128,
    monthlySpend: 45200,
    pendingPayments: 0
  });

  orderStats = signal({
    pending: 3,
    completed: 48,
    cancelled: 2,
    thisWeekOrders: 12
  });

  topPurchased = signal([
    { name: 'Banana', value: 34 },
    { name: 'Tomato', value: 22 },
    { name: 'Apple', value: 17 },
    { name: 'Potato', value: 14 },
    { name: 'Orange', value: 9 }
  ]);

  weeklyPurchases = signal({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [240, 320, 260, 400, 340, 280, 310]
  });

  offers = signal([
    {
      title: "Special Price on Apples",
      desc: "Get fresh Shimla Apples @ ₹110/kg for this week only.",
      color: "bg-blue-600"
    },
    {
      title: "Free Delivery for Orders Above ₹3000",
      desc: "Limited Period Offer!",
      color: "bg-green-600"
    }
  ]);
}
