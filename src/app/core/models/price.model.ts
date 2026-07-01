export interface PriceTier {
  id: string;
  min: number;
  max: number | null;
  pricePerKg: number;
}

export interface PriceConfig {
  productId: string;
  tiers: PriceTier[];
}
