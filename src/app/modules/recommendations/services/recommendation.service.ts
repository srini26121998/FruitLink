import { Injectable, signal, inject } from '@angular/core';
import {
  RecommendationAggregatorService,
  RecommendationInputItem
} from './recommendation-aggregator.service';
import { FinalRecommendation } from '../models/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private aggregator = inject(RecommendationAggregatorService);

  private _recommendations = signal<FinalRecommendation[]>([]);
  private _loading = signal<boolean>(false);

  recommendations = this._recommendations.asReadonly();
  loading = this._loading.asReadonly();

  async generate(
    items: RecommendationInputItem[],
    trendingInput: any[] = [],
    fbtInput: any[] = []
  ): Promise<void> {

    this._loading.set(true);

    try {
      const result = await this.aggregator.generateFinalRecommendations(
        items,
        trendingInput,
        fbtInput
      );
      this._recommendations.set(result);
    } finally {
      this._loading.set(false);
    }
  }
}
