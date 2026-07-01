export interface SmartQtyHistory {
  date: string;      // "2024-01-12"
  qty: number;       // quantity ordered on this date
}

export interface SmartQtyInput {
  id: string;
  name: string;
  unit: string;
  lastOrdered: number;        // last qty ordered
  history: SmartQtyHistory[]; // last 7 / 14 / 30 day record
  stock?: number;             // optional stock data
  avg?: number;               // computed average
}

export interface SmartQtyResult {
  id: string;
  name: string;
  unit: string;
  suggestedQty: number;        // recommended reorder qty
  avg: number;                 // calculated average
  trend: 'up' | 'down' | 'stable';
  confidence: number;          // 0–100 score
  reason: string;              // explanation string
  lowStock?: boolean;          // optional
}
