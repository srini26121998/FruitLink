// src/app/modules/analytics/dashboards/payment-analytics/payment-analytics.service.ts

import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import {
  PaymentFilter,
  PaymentSummary,
  PaymentMethodStats,
  DailyPaymentStat,
  TopCustomers
} from './payment-analytics.model';

@Injectable({ providedIn:'root' })
export class PaymentAnalyticsService {

  // private api = '/api/analytics/payments';
  // constructor(private http: HttpClient) {}

  filter = signal<PaymentFilter>('month');

  summary = signal<PaymentSummary>({
    totalPayments: 1850,
    successful: 1720,
    failed: 85,
    refunded: 45,
    revenue: 325000
  });

  dailyStats = signal<DailyPaymentStat[]>([
    { day:'Mon', amount:42000 },
    { day:'Tue', amount:58000 },
    { day:'Wed', amount:36000 },
    { day:'Thu', amount:72000 },
    { day:'Fri', amount:89000 },
    { day:'Sat', amount:65000 },
    { day:'Sun', amount:43000 },
  ]);

  paymentMethods = signal<PaymentMethodStats[]>([
    { method:'UPI', count:920, amount:165000 },
    { method:'Card', count:620, amount:110000 },
    { method:'Wallet', count:180, amount:35000 },
    { method:'COD', count:130, amount:15000 },
  ]);

  topCustomers = signal<TopCustomers[]>([
    { customer:'Arun', orders:42, spent:38000 },
    { customer:'Kumar', orders:35, spent:32000 },
    { customer:'Priya', orders:31, spent:29500 },
    { customer:'Rahul', orders:28, spent:26500 },
  ]);

  setFilter(range:PaymentFilter){
    this.filter.set(range);

    // 🔥 In future with backend:
    // this.http.get(`${this.api}?range=${range}`).subscribe(res=>{
    //   this.summary.set(res.summary);
    //   this.dailyStats.set(res.daily);
    //   this.paymentMethods.set(res.methods);
    //   this.topCustomers.set(res.topCustomers);
    // });
  }
}
