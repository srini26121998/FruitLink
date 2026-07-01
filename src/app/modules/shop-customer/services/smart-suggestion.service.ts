import { Injectable, signal } from '@angular/core';

export interface SmartSuggestion {
  itemId: string;
  smartQty: number;
  reason: string;
}

export interface RefillAlert {
  itemId: string;
  lowStock: boolean;
  suggestedQty: number;
}

@Injectable({
  providedIn: 'root'
})
export class SmartSuggestionService {

  // Calculate smart recommended qty
  calculateSmartQty(history: number[], lastOrdered: number): SmartSuggestion {
    const avg = Math.round(history.reduce((a, b) => a + b, 0) / history.length);
    const trend = history[history.length - 1] - history[0];
    const trendBoost = Math.round(trend * 0.25);

    const smartQty = Math.max(1, avg + trendBoost);

    return {
      itemId: '',
      smartQty,
      reason:
        trend > 0 ? 'Demand increasing' :
        trend < 0 ? 'Demand decreasing' :
        'Stable demand'
    };
  }

  // Refill alert logic
  getRefillAlert(lastOrderedQty: number, suggestedQty: number): RefillAlert {
    const lowStock = lastOrderedQty < 5;
    return {
      itemId: '',
      lowStock,
      suggestedQty
    };
  }
}
