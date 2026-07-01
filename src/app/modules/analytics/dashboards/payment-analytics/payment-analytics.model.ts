// src/app/modules/analytics/dashboards/payment-analytics/payment-analytics.model.ts

export type PaymentFilter = 'today' | 'week' | 'month' | 'year';

export interface PaymentSummary {
  totalPayments: number;
  successful: number;
  failed: number;
  refunded: number;
  revenue: number;
}

export interface PaymentMethodStats {
  method: string;     // UPI / Card / COD / Wallet
  count: number;
  amount: number;
}

export interface DailyPaymentStat {
  day: string;
  amount: number;
}

export interface TopCustomers {
  customer: string;
  orders: number;
  spent: number; // total amount spent
}
