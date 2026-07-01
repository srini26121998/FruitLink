import { Injectable, signal, inject } from '@angular/core';
import { PriceService } from '../../../core/services/price.service';
import { UnitService } from '../../../core/services/unit.service';

@Injectable({ providedIn: 'root' })
export class CartService {

  private price = inject(PriceService);
  private unit = inject(UnitService);

  cart = signal<any[]>([]);
  private _lastOrder = signal<any | null>(null);   // ← SINGLE correct storage

  constructor() {
    // Load saved cart on start
    const saved = localStorage.getItem('cart');
    if (saved) this.cart.set(JSON.parse(saved));

    // Load last order (if exists)
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) this._lastOrder.set(JSON.parse(savedOrder));
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.cart()));
  }

  /** ───────────────────────────────────────────
   *  ADD ITEM
  ─────────────────────────────────────────────*/
  addItem(itemPayload: any) {
    const unitDef = itemPayload.unitDef ??
      this.unit.globalUnits.find(u => u.id === itemPayload.unitId) ??
      this.unit.globalUnits[0];

    const qtyKg = this.unit.toKg(itemPayload.qty, unitDef);
    const pricePerKg = this.price.getPriceForQty(Math.round(qtyKg));

    const cartItem = {
      id: itemPayload.id,
      name: itemPayload.name,
      qty: itemPayload.qty,
      unitId: unitDef.id,
      unitLabel: unitDef.label,
      qtyKg,
      pricePerKg,
      lineTotal: qtyKg * pricePerKg
    };

    const existsIndex = this.cart().findIndex(i => i.id === cartItem.id && i.unitId === cartItem.unitId);

    if (existsIndex > -1) {
      const arr = [...this.cart()];
      const ex = arr[existsIndex];
      ex.qty += cartItem.qty;
      ex.qtyKg += cartItem.qtyKg;
      ex.pricePerKg = this.price.getPriceForQty(Math.round(ex.qtyKg));
      ex.lineTotal = ex.qtyKg * ex.pricePerKg;
      this.cart.set(arr);
    } else {
      this.cart.set([...this.cart(), cartItem]);
    }

    this.save();
  }

  /** ───────────────────────────────────────────
   *  UPDATE QTY
  ─────────────────────────────────────────────*/
  updateQty(id: string, unitId: string, newQty: number) {
    const arr = this.cart().map(i => {
      if (i.id === id && i.unitId === unitId) {
        const unitDef = this.unit.globalUnits.find(u => u.id === i.unitId) ?? this.unit.globalUnits[0];
        const newQtyKg = this.unit.toKg(newQty, unitDef);
        const newPricePerKg = this.price.getPriceForQty(Math.round(newQtyKg));
        return { ...i, qty: newQty, qtyKg: newQtyKg, pricePerKg: newPricePerKg, lineTotal: newQtyKg * newPricePerKg };
      }
      return i;
    });

    this.cart.set(arr);
    this.save();
  }

  removeItem(id: string, unitId: string) {
    this.cart.set(this.cart().filter(i => !(i.id === id && i.unitId === unitId)));
    this.save();
  }

  clearCart() {
    this.cart.set([]);
    localStorage.removeItem('cart');
  }

  /** ───────────────────────────────────────────
   *  PLACE ORDER – Save + Clear Cart
  ─────────────────────────────────────────────*/
  placeOrder(slot: string, payment: string) {
    const order = {
      items: this.cart(),
      slot,
      payment,
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      totalQty: this.cart().reduce((t, i) => t + i.qty, 0),
      pricing: this.pricing,
      date: new Date().toISOString()
    };

    this._lastOrder.set(order);
    localStorage.setItem('lastOrder', JSON.stringify(order));
    this.clearCart();
  }

  /** Load last order for invoice/summary page */
  get lastOrder() {
    return this._lastOrder();
  }

  /** ───────────────────────────────────────────
   *  PRICING ENGINE (Auto Calculate Total)
  ─────────────────────────────────────────────*/
  get pricing() {
    const items = this.cart();
    const subtotal = items.reduce((sum, it) => sum + (it.lineTotal ?? 0), 0);
    const discount = 0;                     // future slab discount
    const delivery = subtotal > 2000 ? 0 : 50;
    const tax = 0; // fruits & vegetables no GST
    const total = subtotal - discount + delivery + tax;
    return { subtotal, discount, delivery, tax, total };
  }
}
