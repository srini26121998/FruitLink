import { Component, Input, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitService } from '../../../core/services/unit.service';
import { CartService } from '../services/cart.service';
import { PriceService } from '../../../core/services/price.service';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: any;   // { id,name,unitOptions }

  unitSvc = inject(UnitService);
  cart = inject(CartService);
  priceSvc = inject(PriceService);

  qty = signal(1);
  selectedUnit = signal<string>('kg');

  // after input arrives → set default unit automatically
  constructor() {
    effect(() => {
      if (this.product?.unitOptions?.length) {
        this.selectedUnit.set(this.product.unitOptions[0].id);
      }
    });
  }

  currentUnit = computed(() =>
    (this.product?.unitOptions ?? this.unitSvc.globalUnits)
      .find((u: any) => u.id === this.selectedUnit())
  );

  pricePerKg = computed(() =>
    this.priceSvc.getPriceForQty(
      this.unitSvc.toKg(this.qty(), this.currentUnit()!)
    )
  );

  lineTotal = computed(() =>
    this.pricePerKg() * this.unitSvc.toKg(this.qty(), this.currentUnit()!)
  );

  addToCart() {
    this.cart.addItem({
      id: this.product.id,
      name: this.product.name,
      qty: this.qty(),
      unitId: this.selectedUnit()
    });
  }
}
