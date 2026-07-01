import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitService } from '../../../../core/services/unit.service';
import { PriceService } from '../../../../core/services/price.service';
import { ProductsService } from '../../../../core/services/products.service';
import { TemplatesService } from '../../services/templates.service';

interface BulkItem {
  id: string;
  productId: string | null;
  qty: number;
  unitId: string;
  discount?: number;   // discount per item
}

@Component({
  selector: 'app-bulk-items-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulk-items-step.component.html'
})
export class BulkItemsStepComponent {

  unitSvc = inject(UnitService);
  priceSvc = inject(PriceService);
  productAPI = inject(ProductsService);
  templates = inject(TemplatesService);

  products = signal<any[]>([]);
  loading = signal(true);

  constructor() {
    this.productAPI.loadProducts();   

    setTimeout(() => {                     
      this.products.set(this.productAPI.products);
      this.loading.set(false);
    }, 400);
  }

  items = signal<BulkItem[]>([
    { id: crypto.randomUUID(), productId: null, qty: 1, unitId: 'kg', discount: 0 }
  ]);

  addRow() {
    this.items.update(v => [...v, {
      id: crypto.randomUUID(), productId: null, qty: 1, unitId: 'kg', discount: 0
    }]);
  }

  remove(i:number) {
    this.items.update(v => v.filter((_,idx)=>idx!==i));
  }

  update<T extends keyof BulkItem>(i: number, field: T, value: BulkItem[T]): void {
    const rows = structuredClone(this.items());
    rows[i][field] = value;
    this.items.set(rows);

    // Auto-add new row when last row is filled
    const last = this.items().length - 1;
    const row = this.items()[i];

    if (i === last && row.productId && row.qty > 0) {
      this.addRow();
    }
  }

  getRate(i:number): number {
    const row = this.items()[i];
    if(!row.productId) return 0;

    const unit = this.unitSvc.globalUnits.find(u => u.id === row.unitId);
    if(!unit) return 0;

    const qtyKg = row.qty * unit.conversionToKg;
    return this.priceSvc.getPriceForQty(qtyKg);
  }

  getLineTotal(i:number): number {
    const row = this.items()[i];
    const unit = this.unitSvc.globalUnits.find(u => u.id === row.unitId);
    if(!unit) return 0;

    const qtyKg = row.qty * unit.conversionToKg;
    const rate = this.getRate(i);
    const baseTotal = rate * qtyKg;
    const disc = row.discount ? baseTotal * (row.discount/100) : 0;

    return baseTotal - disc;
  }

  grandTotal = computed(() =>
    this.items().reduce((t,_,i)=>t + this.getLineTotal(i), 0)
  );

  saveTemplate() {
  const name = prompt("Template name?");
  if(!name) return;
  this.templates.saveTemplate(name,this.items());
  alert("Template Saved Successfully!");
}
loadTemplate(id:string) {
  const t = this.templates.getTemplate(id);
  if(!t) return;
  this.items.set(structuredClone(t.items));
}

}
