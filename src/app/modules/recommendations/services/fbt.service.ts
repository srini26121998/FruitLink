import { Injectable } from '@angular/core';
import { FbtInput, FbtResult, FbtComboItem } from '../models/fbt.model';

@Injectable({
  providedIn: 'root'
})
export class FbtService {

  /**
   * Generates FBT data: for each item -> list of items frequently bought with it
   */
  getFbt(data: FbtInput[] = []): FbtResult[] {
    if (!data.length) return [];

    // Map structure: itemId -> otherItemId -> count
    const pairCounts = new Map<string, Map<string, number>>();

    for (const order of data) {
      const items = order.items;

      for (let i = 0; i < items.length; i++) {
        const a = items[i];

        for (let j = 0; j < items.length; j++) {
          if (i === j) continue;

          const b = items[j];

          if (!pairCounts.has(a.id)) {
            pairCounts.set(a.id, new Map());
          }

          const mapB = pairCounts.get(a.id)!;
          mapB.set(b.id, (mapB.get(b.id) || 0) + 1);
        }
      }
    }

    return this.transformToResults(pairCounts, data);
  }

  /**
   * Convert pairCounts into array of FbtResult
   */
  private transformToResults(
    pairCounts: Map<string, Map<string, number>>,
    dataset: FbtInput[]
  ): FbtResult[] {

    // Collect names for mapping
    const nameMap = new Map<string, string>();
    for (const order of dataset) {
      order.items.forEach(i => nameMap.set(i.id, i.name));
    }

    const results: FbtResult[] = [];

    pairCounts.forEach((comboMap, itemId) => {
      const combos: FbtComboItem[] = [];

      comboMap.forEach((count, comboId) => {
        combos.push({
          id: comboId,
          name: nameMap.get(comboId) || 'Unknown',
          count,
          confidence: this.computeConfidence(count)
        });
      });

      combos.sort((a, b) => b.count - a.count);

      results.push({
        id: itemId,
        comboWith: combos
      });
    });

    return results;
  }

  /**
   * Confidence = simple weighted scoring
   */
  private computeConfidence(count: number): number {
    if (count >= 10) return 90;
    if (count >= 5) return 70;
    if (count >= 3) return 50;
    return 30;
  }
}
