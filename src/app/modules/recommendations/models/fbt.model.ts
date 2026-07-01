export interface FbtInput {
  orderId: string;
  items: {
    id: string;
    name: string;
    unit: string;
  }[];
}

/**
 * FBT result for a specific item
 */
export interface FbtResult {
  id: string;               // item ID
  comboWith: FbtComboItem[]; // list of recommended pairings
}

/**
 * Combo item structure
 */
export interface FbtComboItem {
  id: string;
  name: string;
  count: number;            // number of times both items purchased together
  confidence: number;       // 0–100
}
