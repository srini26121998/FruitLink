export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  history: number[];  // last 7 orders
  lastOrdered: number;
}

export interface PredictionResult {
  itemId: string;
  suggestedQty: number;
  trend: 'up' | 'down' | 'stable';
  avg: number;
}
