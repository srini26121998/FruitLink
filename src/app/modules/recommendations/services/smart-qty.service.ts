import { Injectable } from '@angular/core';
import { SmartQtyInput, SmartQtyResult } from '../models/smart-qty.model';

@Injectable({
  providedIn: 'root'
})
export class SmartQtyService {

  /**
   * Main function to generate smart quantity recommendations.
   * Accepts raw history input and returns enriched SmartQtyResult[]
   */
  generate(items: SmartQtyInput[] = []): SmartQtyResult[] {
    if (!items.length) return [];

    return items.map(item => this.computeItem(item));
  }

  /**
   * Computes Smart Qty for a single item.
   */
  private computeItem(item: SmartQtyInput): SmartQtyResult {

    // 1. Average quantity
    const avg = this.getAverage(item.history);

    // 2. Trend detection
    const trend = this.getTrend(item.history);

    // 3. Suggested quantity logic
    const suggestedQty = this.computeSuggestedQty(avg, trend);

    // 4. Confidence score
    const confidence = this.computeConfidence(avg, trend);

    // 5. Stock alert
    const lowStock = this.isLowStock(item.stock, suggestedQty);

    return {
      id: item.id,
      name: item.name,
      unit: item.unit,
      avg,
      trend,
      suggestedQty,
      confidence,
      lowStock,
      reason: this.getReason(trend, lowStock)
    };
  }

  /**
   * Average from history
   */
  private getAverage(history: { qty: number }[]): number {
    if (!history.length) return 1;

    const total = history.reduce((sum, h) => sum + h.qty, 0);
    return Math.round(total / history.length);
  }

  /**
   * Trend calculation: up, down, stable
   */
  private getTrend(history: { qty: number }[]): 'up' | 'down' | 'stable' {
    if (history.length < 2) return 'stable';

    const first = history[0].qty;
    const last = history[history.length - 1].qty;

    if (last > first) return 'up';
    if (last < first) return 'down';
    return 'stable';
  }

  /**
   * Suggested quantity based on trend
   */
  private computeSuggestedQty(avg: number, trend: string): number {
    if (trend === 'up') return Math.round(avg * 1.2);
    if (trend === 'down') return Math.round(avg * 0.8);
    return avg;
  }

  /**
   * Confidence score (0–100)
   */
  private computeConfidence(avg: number, trend: string): number {
    let confidence = 50;

    if (trend === 'up') confidence += 30;
    if (trend === 'down') confidence -= 20;

    if (avg > 10) confidence += 10;

    return Math.min(100, Math.max(0, confidence));
  }

  /**
   * Low stock detection
   */
  private isLowStock(stock: number | undefined, suggested: number): boolean {
    if (stock === undefined || stock === null) return false;
    return stock < suggested * 1.2;
  }

  /**
   * Human-readable reason
   */
  private getReason(trend: string, lowStock: boolean): string {
    if (lowStock) return 'Stock running low';
    if (trend === 'up') return 'Demand increasing';
    if (trend === 'down') return 'Demand decreasing';
    return 'Stable demand';
  }
}
