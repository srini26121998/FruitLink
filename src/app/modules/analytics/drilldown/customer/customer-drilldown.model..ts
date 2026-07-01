/* =========================================================
   Customer Drilldown Models
   Domain: B2B Wholesale (Fruit / Juice Distribution)
   Status: FINAL – DO NOT MODIFY WITHOUT DISCUSSION
   ========================================================= */

/* -----------------------------
   Core Customer Profile
-------------------------------- */
export interface CustomerProfile {
  id: string;
  businessName: string;        // Shop / Hotel / Juice Center name
  contactPerson: string;
  email: string;
  phone?: string;

  customerType: 'RETAILER' | 'HOTEL' | 'JUICE_SHOP' | 'WHOLESALER';

  joinedAt: string;            // ISO date
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

  location: CustomerLocation;
}

/* -----------------------------
   Location & Delivery Context
-------------------------------- */
export interface CustomerLocation {
  city: string;
  area: string;
  pincode?: string;
  deliveryRoute?: string;      // For logistics optimization
}

/* -----------------------------
   Financial & KPI Summary
-------------------------------- */
export interface CustomerKpis {
  totalOrders: number;
  totalQuantityKg: number;     // Important for fruit business
  totalSpent: number;

  avgOrderValue: number;
  avgOrderFrequencyDays: number;

  creditLimit?: number;        // B2B specific
  outstandingAmount?: number;
}

/* -----------------------------
   Customer Lifetime Value (CLV)
-------------------------------- */
export interface CustomerLifetimeValue {
  firstOrderDate: string;
  lastOrderDate: string;

  lifetimeOrders: number;
  lifetimeRevenue: number;

  avgMonthlyRevenue: number;
  expectedAnnualValue: number; // Predictive
}

/* -----------------------------
   RFM Segmentation
-------------------------------- */
export interface RfmScore {
  recencyDays: number;         // Days since last order
  frequencyOrders: number;     // Orders in period
  monetaryValue: number;       // Total spend in period

  score: number;               // Combined score (e.g. 1–5)
  segment:
    | 'CHAMPION'
    | 'LOYAL'
    | 'POTENTIAL'
    | 'AT_RISK'
    | 'LOST';
}

/* -----------------------------
   Order & Purchase Trends
-------------------------------- */
export interface TimeSeriesPoint {
  period: string;              // day / week / month
  value: number;
}

export interface CustomerTrends {
  orderCountTrend: TimeSeriesPoint[];
  revenueTrend: TimeSeriesPoint[];
  quantityTrendKg: TimeSeriesPoint[];
}

/* -----------------------------
   Product Affinity & Top Items
-------------------------------- */
export interface ProductAffinity {
  productId: string;
  productName: string;

  totalQuantityKg: number;
  totalRevenue: number;

  repeatPurchaseRate: number;  // %
}

export interface TopProduct {
  productId: string;
  productName: string;

  totalOrders: number;
  totalQuantityKg: number;
  totalAmount: number;
}

/* -----------------------------
   Activity & Audit Logs
-------------------------------- */
export interface CustomerActivityLog {
  timestamp: string;

  type:
    | 'ORDER_PLACED'
    | 'ORDER_DELIVERED'
    | 'PAYMENT_RECEIVED'
    | 'PAYMENT_PENDING'
    | 'CREDIT_LIMIT_UPDATED'
    | 'PROFILE_UPDATED';

  referenceId?: string;        // orderId / paymentId
  description?: string;
  amount?: number;
}

/* -----------------------------
   Drilldown Aggregate Model
-------------------------------- */
export interface CustomerDrilldown {
  profile: CustomerProfile;
  kpis: CustomerKpis;
  clv: CustomerLifetimeValue;
  rfm: RfmScore;

  trends: CustomerTrends;

  topProducts: TopProduct[];
  productAffinity: ProductAffinity[];

  activities: CustomerActivityLog[];
}
