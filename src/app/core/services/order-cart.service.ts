import { Injectable, signal } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class OrderCartService {

  private cart = signal<Record<string, any[]>>({});

  constructor(private products: ProductsService) {}

  // Add/update item
  updateShopItem(shopId: string, productId: string, qty: number) {
    const current = this.cart();
    const product = this.products.products.find(p => p.id === productId);

    if (!product) return;

    const updatedShopItems = [...(current[shopId] || [])];
    const existing = updatedShopItems.find(i => i.productId === productId);

    if (existing) {
      existing.qty = qty;
      existing.total = qty * product.price;
    } else {
      updatedShopItems.push({
        productId,
        name: product.name,
        qty,
        price: product.price,
        total: qty * product.price
      });
    }

    this.cart.set({
      ...current,
      [shopId]: updatedShopItems
    });
  }

  // Get full cart entries
  getAllEntries() {
    return Object.entries(this.cart()).map(([shopId, items]) => ({
      shopId,
      shopName: "Shop " + shopId,
      items
    }));
  }

  // Reset after bulk order
  reset() {
    this.cart.set({});
  }
}
