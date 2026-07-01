export interface TrendingInput {
  id: string;
  name: string;
  unit: string;
  recentSales: number[];   // last 7–30 days sales (freq or qty)
}

export interface TrendingResult {
  id: string;
  name: string;
  unit: string;

  score: number;           // trending intensity score (0–100)
  reason: string;          // "High demand this week"
  confidence: number;      // confidence of trending analysis (0–100)
}
