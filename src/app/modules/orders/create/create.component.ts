import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductMasterService, MasterProduct } from '../services/product-master.service';
import { OrderAdminService } from '../services/order-admin.service';

interface OrderItem {
  productId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CreateComponent implements OnInit {
  private productMaster = inject(ProductMasterService);
  private orderAdmin    = inject(OrderAdminService);
  private router        = inject(Router);
  private route         = inject(ActivatedRoute);

  // Prefill mode tracking
  prefillMode: 'reorder' | 'duplicate' | null = null;
  sourceOrderId: string = '';

  // Shop info
  shopName: string     = '';
  shopLocation: string = '';
  shopPhone: string    = '';
  deliverySlot: string = '';
  orderDate: string    = new Date().toISOString().split('T')[0];
  orderNotes: string   = '';

  // Shop dropdown state
  isShopDropdownOpen: boolean = false;
  shopSearchTerm: string      = '';

  // Catalog state
  categories        = this.productMaster.getCategories();
  selectedCategory  : string = 'All';
  productSearch     : string = '';
  sortOrder         : string = 'name';
  viewMode          : 'grid' | 'list' = 'grid';

  items: OrderItem[] = [];
  showOrderSuccess   : boolean = false;

  shops = [
    'Anna Fruit Store', 'Fresh Mart', 'Green Leaf Market', 'Juice Hub',
    'Morning Dew', 'Berry Good', 'Sunny Sides', 'Daily Squeeze',
    'Citrus Stand', 'Mango Magic', 'Cool Sip Station', 'The Fruit Basket'
  ];

  deliverySlots = ['5AM - 7AM', '6AM - 8AM', '7AM - 9AM', '8AM - 10AM', '9AM - 11AM'];

  // ── Lifecycle: Read prefill data ────────────────────────────────
  ngOnInit() {
    const prefill = this.orderAdmin.prefillData();
    if (prefill) {
      this.prefillMode    = prefill.mode;
      this.sourceOrderId  = prefill.sourceOrderId;
      this.shopName       = prefill.shopName;
      this.shopLocation   = prefill.shopLocation ?? '';
      this.shopPhone      = prefill.shopPhone ?? '';
      this.deliverySlot   = prefill.deliverySlot ?? '';
      this.orderDate      = prefill.orderDate;

      // Prefill cart items
      this.items = prefill.items.map(i => ({
        productId: i.productId,
        name:      i.name,
        category:  i.category,
        quantity:  i.quantity,
        unit:      i.unit,
        price:     i.price,
        total:     i.total
      }));

      // Clear prefill data after consuming it
      this.orderAdmin.prefillData.set(null);
    }
  }

  // ── Shop Dropdown Helpers ─────────────────────────────────────────
  get filteredShops(): string[] {
    if (!this.shopSearchTerm.trim()) {
      return this.shops;
    }
    const term = this.shopSearchTerm.toLowerCase();
    return this.shops.filter(s => s.toLowerCase().includes(term));
  }

  toggleShopDropdown() {
    this.isShopDropdownOpen = !this.isShopDropdownOpen;
    if (this.isShopDropdownOpen) {
      this.shopSearchTerm = '';
    }
  }

  selectShop(shop: string) {
    this.shopName = shop;
    this.isShopDropdownOpen = false;
    this.shopSearchTerm = '';
  }

  // ── Computed product list ──────────────────────────────────────────
  get availableProducts(): MasterProduct[] {
    let products = this.productMaster.getAvailable();

    if (this.selectedCategory !== 'All') {
      products = products.filter(p => p.category === this.selectedCategory);
    }

    if (this.productSearch.trim()) {
      const term = this.productSearch.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(term));
    }

    // Sorting
    products = [...products].sort((a, b) => {
      switch (this.sortOrder) {
        case 'name':       return a.name.localeCompare(b.name);
        case 'name-desc':  return b.name.localeCompare(a.name);
        case 'price-asc':  return a.pricePerUnit - b.pricePerUnit;
        case 'price-desc': return b.pricePerUnit - a.pricePerUnit;
        default:           return 0;
      }
    });

    return products;
  }

  get orderTotal(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // ── Category helpers ──────────────────────────────────────────────
  getTotalCount(): number {
    return this.productMaster.getAvailable().length;
  }

  getCategoryCount(category: string): number {
    return this.productMaster.getAvailable().filter(p => p.category === category).length;
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Fruits':            return '🍎';
      case 'Vegetables':        return '🥦';
      case 'Groceries':         return '🛒';
      case 'Daily Consumables': return '🥛';
      default:                  return '📦';
    }
  }

  // ── Cart helpers ──────────────────────────────────────────────────
  isInCart(productId: string): boolean {
    return this.items.some(i => i.productId === productId);
  }

  getCartQty(productId: string): number {
    return this.items.find(i => i.productId === productId)?.quantity ?? 0;
  }

  addProductToOrder(product: MasterProduct) {
    const existing = this.items.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += 1;
      existing.total = existing.quantity * existing.price;
    } else {
      this.items.push({
        productId: product.id,
        name:      product.name,
        category:  product.category,
        quantity:  1,
        unit:      product.unit,
        price:     product.pricePerUnit,
        total:     product.pricePerUnit
      });
    }
  }

  incrementCart(productId: string) {
    const item = this.items.find(i => i.productId === productId);
    if (item) { item.quantity += 1; item.total = item.quantity * item.price; }
  }

  decrementCart(productId: string) {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      if (item.quantity > 1) { item.quantity -= 1; item.total = item.quantity * item.price; }
      else                   { this.removeFromCart(productId); }
    }
  }

  setCartQty(productId: string, event: Event) {
    const val  = +(event.target as HTMLInputElement).value;
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = val > 0 ? val : 1;
      item.total    = item.quantity * item.price;
    }
  }

  removeFromCart(productId: string) {
    this.items = this.items.filter(i => i.productId !== productId);
  }

  updateItemTotal(index: number) {
    const item = this.items[index];
    if (item.quantity < 1) item.quantity = 1;
    item.total = item.quantity * item.price;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  // ── Submit ────────────────────────────────────────────────────────
  submitOrder() {
    if (!this.shopName || !this.deliverySlot || this.items.length === 0) return;

    const newOrder = {
      id:        this.orderAdmin.generateOrderId(),
      shop:      this.shopName,
      date:      this.orderDate,
      slot:      this.deliverySlot,
      qty:       this.itemCount,
      status:    0,
      orderType: 'daily' as const,
      items:     this.items.map(i => ({
        id:         i.productId,
        name:       i.name,
        category:   i.category,
        qty:        i.quantity,
        unitLabel:  i.unit,
        qtyKg:      i.quantity,
        pricePerKg: i.price,
        lineTotal:  i.total
      })),
      total:     this.orderTotal,
      discount:  0,
      createdAt: new Date().toISOString(),
      createdBy: 'Shop Manager',
      paymentStatus: 'Pending' as const
    };

    this.orderAdmin.addOrder(newOrder);
    this.showOrderSuccess = true;
    setTimeout(() => this.router.navigate(['/orders/list']), 2000);
  }
}
