import { Injectable } from '@angular/core';
import { AutoReorderInput, AutoReorderResult } from '../models/auto-reorder.model';

@Injectable({
  providedIn: 'root'
})
export class AutoReorderService {

  /**
   * Main function: Generates auto-reorder predictions
   */
  generate(items: AutoReorderInput[] = []): AutoReorderResult[] {
    if (!items.length) return [];
    return items.map(item => this.computeItem(item));
  }

  /**
   * Compute prediction for a single item
   */
  private computeItem(item: AutoReorderInput): AutoReorderResult {

    const consumptionRate = this.computeDailyConsumption(item.history);
    const reorderCycle = this.computeReorderCycle(item.history);
    const suggestedQty = Math.round(consumptionRate * reorderCycle);

    const nextDate = this.calculateNextReorderDate(item.history, reorderCycle);

    const lowStock = this.isLowStock(item.stock, suggestedQty);

    const confidence = this.computeConfidence(consumptionRate, reorderCycle);

    return {
      id: item.id,
      name: item.name,
      unit: item.unit,
      predictedDays: reorderCycle,
      suggestedQty,
      nextReorderDate: nextDate,
      confidence,
      reason: this.getReason(consumptionRate, reorderCycle, lowStock),
      lowStock
    };
  }

  /**
   * 1. Daily consumption rate
   */
  private computeDailyConsumption(history: { date: string; qty: number }[]): number {
    if (history.length < 2) return 1;

    let total = 0;
    let days = 0;

    for (let i = 1; i < history.length; i++) {
      const prev = new Date(history[i - 1].date);
      const curr = new Date(history[i].date);

      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diff > 0) {
        total += history[i].qty;
        days += diff;
      }
    }

    if (days === 0) return 1;

    return Math.max(1, Math.round(total / days)); // qty per day
  }

  /**
   * 2. Reorder cycle (avg gap between orders)
   */
  private computeReorderCycle(history: { date: string }[]): number {
    if (history.length < 2) return 3; // default small cycle

    const gaps: number[] = [];

    for (let i = 1; i < history.length; i++) {
      const prev = new Date(history[i - 1].date);
      const curr = new Date(history[i].date);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diff > 0) gaps.push(diff);
    }

    if (!gaps.length) return 3;

    const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    return Math.max(2, Math.round(avgGap)); // minimum 2 days
  }

  /**
   * 3. Predict next reorder date
   */
  private calculateNextReorderDate(history: { date: string }[], cycle: number): string {
    const lastDate = new Date(history[history.length - 1].date);
    lastDate.setDate(lastDate.getDate() + cycle);
    return lastDate.toISOString().split('T')[0];
  }

  /**
   * 4. Confidence score
   */
  private computeConfidence(consumptionRate: number, cycle: number): number {
    let score = 50;

    if (consumptionRate > 5) score += 20;
    if (cycle > 3) score += 10;

    return Math.min(100, score);
  }

  /**
   * 5. Low stock detection
   */
  private isLowStock(stock: number | undefined, suggested: number): boolean {
    if (stock == null) return false;
    return stock < suggested * 1.2;
  }

  /**
   * 6. Human readable reason
   */
  private getReason(consumption: number, cycle: number, lowStock: boolean): string {
    if (lowStock) return 'Low stock – reorder needed soon';
    if (consumption > 5) return 'High consumption rate detected';
    if (cycle <= 3) return 'Frequent reorder cycle';
    return 'Stable reorder pattern';
  }
}
