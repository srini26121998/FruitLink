import { Injectable, inject } from '@angular/core';

import { SmartSuggestionService, SmartSuggestion } from '../../shop-customer/services/smart-suggestion.service';
import { AutoReorderService, AutoReorderRecommendation } from '../../shop-customer/services/auto-reorder.service';
import { TrendingService } from './trending.service';
import { FbtService } from './fbt.service';

import { FinalRecommendation } from '../models/recommendation.model';
import { TrendingResult } from '../models/trending.model';
import { FbtResult } from '../models/fbt.model';

/**
 * Input required from Repeat Order / Cart
 */
export interface RecommendationInputItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  history: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationAggregatorService {

  private smart = inject(SmartSuggestionService);
  private auto = inject(AutoReorderService);
  private trending = inject(TrendingService);
  private fbt = inject(FbtService);

  async generateFinalRecommendations(
    items: RecommendationInputItem[],
    trendingInput: any[] = [],
    fbtInput: any[] = []
  ): Promise<FinalRecommendation[]> {

    const map = new Map<string, FinalRecommendation>();

    /* =====================================================
       1️⃣ SMART QTY + AUTO REORDER
    ===================================================== */
    for (const item of items) {

      // ---- Smart Qty ----
      const smart: SmartSuggestion =
        this.smart.calculateSmartQty(item.history, item.qty);

      smart.itemId = item.id;

      map.set(item.id, {
        itemId: item.id,
        name: item.name,
        smartQty: smart,
        autoReorder: null,
        trending: null,
        fbt: null,
        confidence: this.smartConfidence(smart)
      });

      // ---- Auto Reorder ----
      const auto: AutoReorderRecommendation =
        this.auto.getAutoReorderRecommendation(
          item.id,                 // ✅ string (FIXED)
          item.history,
          item.qty,
          new Date()
        );

      const existing = map.get(item.id)!;
      existing.autoReorder = auto;

      existing.confidence = Math.max(
        existing.confidence,
        this.autoConfidence(auto)
      );
    }

    /* =====================================================
       2️⃣ TRENDING
    ===================================================== */
    const trendingData: TrendingResult[] =
      this.trending.getTrending(trendingInput);

    trendingData.forEach(t => {
      const existing = map.get(t.id);

      if (existing) {
        existing.trending = t;
        existing.confidence = Math.max(existing.confidence, t.confidence);
      } else {
        map.set(t.id, {
          itemId: t.id,
          name: t.name,
          smartQty: null,
          autoReorder: null,
          trending: t,
          fbt: null,
          confidence: t.confidence
        });
      }
    });

    /* =====================================================
       3️⃣ FBT
    ===================================================== */
    const fbtData: FbtResult[] =
      this.fbt.getFbt(fbtInput);

    fbtData.forEach(f => {
      const existing = map.get(f.id);

      if (existing) {
        existing.fbt = f;
      } else {
        map.set(f.id, {
          itemId: f.id,
          name: 'Unknown',
          smartQty: null,
          autoReorder: null,
          trending: null,
          fbt: f,
          confidence: this.fbtConfidence(f)
        });
      }
    });

    /* =====================================================
       FINAL SORT
    ===================================================== */
    return Array
      .from(map.values())
      .sort((a, b) => b.confidence - a.confidence);
  }

  /* =====================================================
     CONFIDENCE MAPPERS (ENTERPRISE SAFE)
  ===================================================== */

  private smartConfidence(s: SmartSuggestion): number {
    if (s.reason.includes('increasing')) return 75;
    if (s.reason.includes('decreasing')) return 40;
    return 60;
  }

  private autoConfidence(a: AutoReorderRecommendation): number {
    switch (a.confidence) {
      case 'high': return 85;
      case 'medium': return 65;
      case 'low': return 40;
      default: return 50;
    }
  }

  private fbtConfidence(f: FbtResult): number {
    if (!f.comboWith.length) return 30;
    return Math.max(...f.comboWith.map(c => c.confidence));
  }
}
