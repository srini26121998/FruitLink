import { SmartSuggestion } from '../../shop-customer/services/smart-suggestion.service';
import { AutoReorderRecommendation } from '../../shop-customer/services/auto-reorder.service';
import { TrendingResult } from './trending.model';
import { FbtResult } from './fbt.model';

export interface FinalRecommendation {
  itemId: string;
  name: string;

  /** Smart quantity recommendation */
  smartQty?: SmartSuggestion | null;

  /** Auto reorder recommendation */
  autoReorder?: AutoReorderRecommendation | null;

  /** Trending signal */
  trending?: TrendingResult | null;

  /** Frequently bought together */
  fbt?: FbtResult | null;

  /** Normalized confidence score (0–100) */
  confidence: number;
}
