import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriceTier, PriceConfig } from '../models/price.model';

@Injectable({ providedIn: 'root' })
export class PriceService {

  private http = inject(HttpClient);

  // store config per product
  priceConfig = signal<PriceConfig[]>([]);

  // fallback default tiers
  defaultTiers: PriceTier[] = [
    { id: 't1', min: 1, max: 10, pricePerKg: 120 },
    { id: 't2', min: 11, max: 50, pricePerKg: 110 },
    { id: 't3', min: 51, max: null, pricePerKg: 100 }
  ];

  getPriceForQty(qty: number, productId: string = 'default'): number {
    const cfg = this.priceConfig().find(c => c.productId === productId);

    const tiers = cfg?.tiers ?? this.defaultTiers;

    const t = tiers.find(x => qty >= x.min && (x.max === null || qty <= x.max));
    return t?.pricePerKg ?? 0;
  }

  load(productId: string) {
    return this.http.get<PriceConfig>(`/api/prices/${productId}`).subscribe(res => {
      const others = this.priceConfig().filter(p => p.productId !== productId);
      this.priceConfig.set([...others, res]);
    });
  }

  save(productId: string, tiers: PriceTier[]) {
    const payload: PriceConfig = { productId, tiers };

    return this.http.post(`/api/prices/${productId}`, payload).subscribe(() => {
      console.log("💾 Price config saved");
      
      const others = this.priceConfig().filter(p => p.productId !== productId);
      this.priceConfig.set([...others, payload]);
    });
  }
}
