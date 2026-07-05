// src/app/modules/analytics/dashboards/delivery-analytics/delivery-analytics.service.ts

import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import {
  DeliveryFilter,
  DeliverySummary,
  DeliveryPerformance,
  DriverRanking,
  DeliveryByCity,
  AvgDeliveryTime
} from './delivery-analytics.model';

@Injectable({ providedIn: 'root' })
export class DeliveryAnalyticsService {

  // private apiBase = '/api/analytics/delivery';
  // constructor(private http: HttpClient) {}

  filter = signal<DeliveryFilter>('month');

  summary = signal<DeliverySummary>({
    totalDeliveries: 1520,
    delivered: 1340,
    inTransit: 120,
    pending: 45,
    failed: 15,
    damaged: 12,
  });

  performance = signal<DeliveryPerformance[]>([
    { date:'Mon', delivered:180, failed:3, damaged: 2 },
    { date:'Tue', delivered:210, failed:5, damaged: 4 },
    { date:'Wed', delivered:160, failed:4, damaged: 1 },
    { date:'Thu', delivered:240, failed:2, damaged: 0 },
    { date:'Fri', delivered:300, failed:6, damaged: 3 },
    { date:'Sat', delivered:280, failed:3, damaged: 1 },
    { date:'Sun', delivered:190, failed:1, damaged: 1 },
  ]);

  drivers = signal<DriverRanking[]>([
    { driver:'Ravi',   completed:420, rating:4.9 },
    { driver:'Kumar',  completed:390, rating:4.7 },
    { driver:'Naveen', completed:350, rating:4.6 },
    { driver:'Suresh', completed:300, rating:4.3 },
  ]);

  deliveriesByCity = signal<DeliveryByCity[]>([
    { city:'Chennai', deliveries:450 },
    { city:'Bangalore', deliveries:380 },
    { city:'Hyderabad', deliveries:320 },
    { city:'Coimbatore', deliveries:260 },
  ]);

  avgDeliveryTime = signal<AvgDeliveryTime[]>([
    { day:'Mon', duration:42 },
    { day:'Tue', duration:39 },
    { day:'Wed', duration:46 },
    { day:'Thu', duration:40 },
    { day:'Fri', duration:35 },
    { day:'Sat', duration:37 },
    { day:'Sun', duration:45 },
  ]);

  setFilter(filter: DeliveryFilter) {
    this.filter.set(filter);

    // 🔥 later with API:
    // this.http.get(`${this.apiBase}?range=${filter}`).subscribe(res => {
    //   this.summary.set(res.summary);
    //   this.performance.set(res.performance);
    //   this.drivers.set(res.driverRanking);
    //   this.deliveriesByCity.set(res.cityData);
    //   this.avgDeliveryTime.set(res.avgDeliveryTime);
    // });
  }
}
