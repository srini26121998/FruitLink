import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceService } from '../../../core/services/price.service';
import { PriceTier } from '../../../core/models/price.model';

@Component({
  selector: 'app-price-tiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-tiers.component.html'
})
export class PriceTiersComponent {

  priceSvc = inject(PriceService);

  productId = signal<string>('default-product');

  // 🔥 Strong typed signal (fixes your "never" error)
  tiers = signal<PriceTier[]>([
    { id: 't1', min: 1, max: 10, pricePerKg: 120 },
    { id: 't2', min: 11, max: 50, pricePerKg: 110 },
    { id: 't3', min: 51, max: null, pricePerKg: 100 }
  ]);

  // 🔥 Strict update to avoid "never" type error
  update(i: number, field: keyof PriceTier, value: number | string | null) {
    const copy = this.tiers().map((t, index) =>
      index === i ? { ...t, [field]: value } as PriceTier : t
    );
    this.tiers.set(copy);
  }

  addRow(){
    this.tiers.update(v => [
      ...v,
      {
        id: crypto.randomUUID(),
        min: 0,
        max: null,
        pricePerKg: 0
      }
    ]);
  }

  deleteRow(i:number){
    this.tiers.update(v => v.filter((_,x)=>x!==i));
  }

  save(){
    this.priceSvc.save(this.productId(), this.tiers());
  }
}
