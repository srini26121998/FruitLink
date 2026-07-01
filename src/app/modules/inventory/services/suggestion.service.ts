import { Injectable, signal } from '@angular/core';
import { InventoryItem, PredictionResult } from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class SuggestionService {

  items = signal<InventoryItem[]>([
    { id: 'apple', name: 'Apple', unit: 'kg', lastOrdered: 12, history: [10, 12, 11, 13, 12, 14, 11] },
    { id: 'banana', name: 'Banana', unit: 'kg', lastOrdered: 8, history: [7, 8, 9, 8, 7, 8, 10] },
    { id: 'tomato', name: 'Tomato', unit: 'kg', lastOrdered: 15, history: [14, 16, 15, 17, 16, 18, 15] }
  ]);

  suggestions = signal<PredictionResult[]>([]);

  calculateSuggestions() {
    const result: PredictionResult[] = this.items().map(item => {
      const avg = Math.round(item.history.reduce((a, b) => a + b, 0) / item.history.length);

      const trend: 'up' | 'down' | 'stable' =
        item.history[item.history.length - 1] > item.history[0] ? 'up' :
        item.history[item.history.length - 1] < item.history[0] ? 'down' :
        'stable';

      return {
        itemId: item.id,
        suggestedQty: avg,
        trend,
        avg
      };
    });

    this.suggestions.set(result);
  }
}
