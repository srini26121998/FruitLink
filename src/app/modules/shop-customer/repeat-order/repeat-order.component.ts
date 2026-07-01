import {
  Component,
  inject,
  signal,
  computed,
  DoCheck,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepeatOrderService } from '../services/repeat-order.service';
import { CartService } from '../services/cart.service';
import { SmartSuggestionService } from '../services/smart-suggestion.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { AutoReorderService } from '../services/auto-reorder.service';

// 🔥 Recommendation system (NEW – already created by you)
import { RecommendationService } from '../../recommendations/services/recommendation.service';

@Component({
  selector: 'app-repeat-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repeat-order.component.html',
  styleUrls: ['./repeat-order.component.css']
})
export class RepeatOrderComponent implements OnInit, DoCheck {

  // ===============================
  // EXISTING SERVICES (DO NOT TOUCH)
  // ===============================
  ro = inject(RepeatOrderService);
  cart = inject(CartService);
  smart = inject(SmartSuggestionService);
  notify = inject(NotificationService);
  auto = inject(AutoReorderService);

  // ===============================
  // RECOMMENDATION SERVICE (NEW)
  // ===============================
  rec = inject(RecommendationService);

  // ===============================
  // UI STATE SIGNALS
  // ===============================
  stickyOpen = signal(false);

  // 🔍 Search & Filter
  searchText = signal('');
  selectedCategory = signal('All');
  private debounceTimer: any;

  // 🔥 Recommendation UI state (FIXED)
  recommendations = signal<any[]>([]);
  recommendationsLoading = signal<boolean>(true);

  // ===============================
  // CATEGORY CONFIG
  // ===============================
  categoryIcons: Record<string, string> = {
    Fruits: 'nutrition',
    Vegetables: 'eco',
    Grocery: 'shopping_bag',
    General: 'category'
  };

  categories = computed(() => {
    const items = this.ro.repeatCart();
    const set = new Set(items.map(i => i.category ?? 'General'));
    return ['All', ...set];
  });

  // ===============================
  // FILTERED ITEMS
  // ===============================
  filteredItems = computed(() => {
    const search = this.searchText().toLowerCase();
    const cat = this.selectedCategory();

    return this.ro.repeatCart().filter(i =>
      i.name.toLowerCase().includes(search) &&
      (cat === 'All' || i.category === cat)
    );
  });

  // ===============================
  // SEARCH HANDLING
  // ===============================
  onSearch(e: any) {
    clearTimeout(this.debounceTimer);
    const val = e.target.value;
    this.debounceTimer = setTimeout(() => {
      this.searchText.set(val);
    }, 250);
  }

  setCategory(c: string) {
    this.selectedCategory.set(c);
  }

  highlight(text: string): string {
    const s = this.searchText().trim();
    if (!s) return text;
    const regex = new RegExp(`(${s})`, 'gi');
    return text.replace(regex, `<span class="bg-yellow-200">${s}</span>`);
  }

  // ===============================
  // TOTALS (STICKY CART BAR)
  // ===============================
  totalItems = 0;
  totalQty = 0;

  ngDoCheck() {
    const items = this.ro.repeatCart();
    this.totalItems = items.length;
    this.totalQty = items.reduce((s, i) => s + i.qty, 0);
  }

  // ===============================
  // ITEM HELPERS
  // ===============================
  lowStock(item: any): boolean {
    return item.qty < 5;
  }

  getSmartQty(item: any): number {
    const s = this.smart.calculateSmartQty(item.history, item.qty);
    return s.smartQty;
  }

  getRefill(item: any) {
    const s = this.smart.calculateSmartQty(item.history, item.qty);
    return this.smart.getRefillAlert(item.qty, s.smartQty);
  }

  getAutoReorder(item: any) {
    return this.auto.getAutoReorderRecommendation(
      item.id,
      item.history,
      item.qty,
      new Date()
    );
  }

  getDaysLeft(autoRec: any): number {
    if (!autoRec?.recommendedDate) return 0;
    const today = new Date();
    const target = new Date(autoRec.recommendedDate);
    const diff = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  // ===============================
  // CART ACTIONS
  // ===============================
  repeatAllToCart() {
    this.ro.repeatCart().forEach(i => this.cart.addItem(i));
    this.notify.success('All items added to cart!');
  }

  addSingleItem(item: any) {
    this.cart.addItem(item);
    item.added = true;
    this.notify.success(`${item.name} added!`);
    setTimeout(() => (item.added = false), 1200);
  }

  removeItem(id: any) {
    this.ro.removeItem(id);
  }

  goToCart() {
    this.notify.info('Opening cart...');
  }

  // ===============================
  // RECOMMENDATIONS INIT
  // ===============================
async ngOnInit() {
  this.recommendationsLoading.set(true);

  try {
    // 1️⃣ Build input from repeat cart (single source of truth)
    const items = this.ro.repeatCart().map(i => ({
      id: i.id,
      name: i.name,
      unit: i.unit,
      qty: i.qty,
      history: i.history ?? []   // safe fallback
    }));

    // 2️⃣ Generate recommendations with required input
    await this.rec.generate(items);

    // 3️⃣ Pull final ranked list (signal)
    this.recommendations.set(this.rec.recommendations());

  } catch (err) {
    console.error('Recommendation generation failed', err);
  } finally {
    this.recommendationsLoading.set(false);
  }
}

  // ===============================
  // STICKY BAR TOGGLE
  // ===============================
  toggleSticky() {
    this.stickyOpen.update(v => !v);
  }
}
