import { Injectable } from '@angular/core';
import { TrendingInput, TrendingResult } from '../models/trending.model';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  /**
   * Returns trending list sorted by score (top first)
   */
  getTrending(data: TrendingInput[] = []): TrendingResult[] {
    if (!data.length) return [];

    return data
      .map(item => this.computeTrend(item))
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Compute trend score for a single item
   */
  private computeTrend(item: TrendingInput): TrendingResult {
    const sales = item.recentSales;

    if (!sales.length) {
      return {
        id: item.id,
        name: item.name,
        unit: item.unit,
        score: 20,
        reason: 'No recent sales data',
        confidence: 40
      };
    }

    const first = sales[0];
    const last = sales[sales.length - 1];

    const increasing = last > first;
    const avg = sales.reduce((a, b) => a + b, 0) / sales.length;

    const score = this.calculateScore(increasing, avg);
    const confidence = this.calculateConfidence(sales);

    return {
      id: item.id,
      name: item.name,
      unit: item.unit,
      score,
      reason: increasing ? 'High demand this week' : 'Stable demand',
      confidence
    };
  }

  /**
   * Score = trending intensity (0–100)
   */
  private calculateScore(increasing: boolean, avg: number): number {
    let score = 40;

    if (increasing) score += 30;
    if (avg > 10) score += 20;

    return Math.min(100, score);
  }

  /**
   * Confidence score based on data quality
   */
  private calculateConfidence(sales: number[]): number {
    if (sales.length < 3) return 40;
    if (sales.length < 7) return 60;
    return 80;
  }
}
