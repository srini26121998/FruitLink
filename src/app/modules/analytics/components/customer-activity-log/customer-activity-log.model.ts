export interface CustomerActivity {
  id: string;
  customer: string;
  event: string;      // "Order Placed", "Payment Failed", etc.
  timestamp: string;  // ISO date
  icon: string;       // heroicon name
  color: string;      // badge color
}
