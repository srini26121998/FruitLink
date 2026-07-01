/**
 * Raw purchase pattern input used for auto-reorder prediction.
 */
export interface AutoReorderInput {
  id: string;
  name: string;
  unit: string;

  // Order history (dates + qty)
  history: {
    date: string;   // "2024-01-15"
    qty: number;
  }[];

  // Current stock level (optional)
  stock?: number;
}


/**
 * Final AI-like prediction for reorder.
 */
export interface AutoReorderResult {
  id: string;
  name: string;
  unit: string;

  predictedDays: number;      // e.g., reorder every 4 days
  suggestedQty: number;       // recommended reorder quantity
  nextReorderDate: string;    // formatted YYYY-MM-DD
  confidence: number;         // 0–100
  reason: string;             // "High consumption rate", etc.
  lowStock?: boolean;         // UI badge
}
