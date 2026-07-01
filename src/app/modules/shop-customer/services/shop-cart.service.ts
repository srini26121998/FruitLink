import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShopCartService {

  private items = signal<Record<string, any>>({}); // productId -> details

  // ==============================
  // 🔹 Add new product
  // ==============================
  add(product: any, qty: number = 1) {
    const current = this.items();
    const existing = current[product.id];

    const updated = {
      ...current,
      [product.id]: {
        ...product,
        qty: existing ? existing.qty + qty : qty,
        total: (existing ? existing.qty + qty : qty) * product.price
      }
    };

    this.items.set(updated);
  }

  // ==============================
  // 🔹 Update quantity
  // ==============================
  update(productId: string, qty: number) {
    const current = this.items();

    if (qty <= 0) {
      delete current[productId];
      this.items.set({ ...current });
      return;
    }

    current[productId].qty = qty;
    current[productId].total = qty * current[productId].price;

    this.items.set({ ...current });
  }

  // ==============================
  // 🔹 Remove product
  // ==============================
  remove(productId: string) {
    const current = this.items();
    delete current[productId];
    this.items.set({ ...current });
  }

  // ==============================
  // 🔹 Clear full cart
  // ==============================
  clear() {
    this.items.set({});
  }

  // ==============================
  // ✔ Getters for Template Usage
  // ==============================

  /** For UI loops instead of directly accessing private items */
  cartList = computed(() => Object.values(this.items()));

  totalPrice = computed(() =>
    this.cartList().reduce((a: number, b: any) => a + b.total, 0)
  );

  totalItems = computed(() => this.cartList().length);

  // ========== Required for FIX ==========
  hasItem(id: string) {
    return !!this.items()[id];
  }

  getQty(id: string) {
    return this.items()[id]?.qty ?? 0;
  }

  increaseQty(id: string) {
    const item = this.items()[id];
    if (item) this.update(id, item.qty + 1);
  }

  decreaseQty(id: string) {
    const item = this.items()[id];
    if (!item) return;
    item.qty > 1 ? this.update(id, item.qty - 1) : this.remove(id);
  }
}
