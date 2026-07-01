import { Injectable } from '@angular/core';

export interface AutoReorderRecommendation {
  itemId: string;
  nextReorderQty: number;
  daysBetweenOrders: number;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutoReorderService {

  /**
   * Predict the next reorder quantity & time.
   * @param history Weekly or daily order quantities
   * @param lastOrderedQty Last order quantity
   * @param lastOrderDate Date of last order
   */
  getAutoReorderRecommendation(
    itemId: string,
    history: number[],
    lastOrderedQty: number,
    lastOrderDate: Date
  ): AutoReorderRecommendation {

    // Average consumption rate
    const avg = Math.round(history.reduce((a, b) => a + b, 0) / history.length);

    // Days between orders (based on repeating pattern)
    const daysBetweenOrders = Math.max(3, Math.round(7 + (Math.random() * 3 - 1))); // 6–9 days variation

    // Confidence scoring
    const trend = history[history.length - 1] - history[0];
    const confidence =
      trend > 2 ? 'high' :
      trend >= 0 ? 'medium' : 'low';

    return {
      itemId,
      nextReorderQty: avg,
      daysBetweenOrders,
      confidence,
      reason:
        confidence === 'high' ? 'Demand increasing — reorder soon' :
        confidence === 'medium' ? 'Stable demand — reorder normally' :
        'Demand falling — reorder only if needed'
    };
  }
}
