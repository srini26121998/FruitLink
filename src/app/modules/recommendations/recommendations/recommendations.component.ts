import {
  Component,
  inject,
  signal,
  computed,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationService } from '../services/recommendation.service';
import { FinalRecommendation } from '../models/recommendation.model';
import { CartService } from '../../shop-customer/services/cart.service';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  private recService = inject(RecommendationService);
  private cart = inject(CartService);

  // ===============================
  // CORE SIGNALS
  // ===============================
  loading = this.recService.loading;
  all = this.recService.recommendations;

  // ===============================
  // FILTER STATE
  // ===============================
  activeFilter = signal<'all' | 'trending' | 'reorder' | 'fbt' | 'smartqty'>('all');

  filtered = computed<FinalRecommendation[]>(() => {
    const f = this.activeFilter();
    const list = this.all();

    switch (f) {
      case 'trending':
        return list.filter(r => !!r.trending);
      case 'reorder':
        return list.filter(r => !!r.autoReorder);
      case 'fbt':
        return list.filter(r => !!r.fbt);
      case 'smartqty':
        return list.filter(r => !!r.smartQty);
      default:
        return list;
    }
  });

  // ===============================
  // 🔥 MEMOIZED FBT NAMES MAP
  // ===============================
  /**
   * itemId -> "Apple, Banana, Orange"
   * Computed ONCE per recommendations update
   */
  fbtNamesMap = computed<Record<string, string>>(() => {
    const map: Record<string, string> = {};

    for (const rec of this.all()) {
      if (rec.fbt?.comboWith?.length) {
        map[rec.itemId] = rec.fbt.comboWith
          .slice(0, 3)
          .map(c => c.name)
          .join(', ');
      }
    }
    return map;
  });

  // ===============================
  // STICKY BAR STATE + MOBILE SWIPE
  // ===============================
  stickyOpen = signal(false);
  private touchStartY = 0;
  private touchEndY = 0;

  toggleSticky() {
    this.stickyOpen.update(v => !v);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    this.touchStartY = e.changedTouches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent) {
    this.touchEndY = e.changedTouches[0].clientY;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.touchStartY - this.touchEndY;

    // swipe up → open
    if (diff > 60) {
      this.stickyOpen.set(true);
    }

    // swipe down → close
    if (diff < -60) {
      this.stickyOpen.set(false);
    }
  }

  // ===============================
  // CART ACTION
  // ===============================
  addToCart(item: FinalRecommendation) {
    this.cart.addItem({
      id: item.itemId,
      name: item.name,
      qty: item.smartQty?.smartQty ?? 1,
      unit: 'kg'
    });
  }
  setFilter(type: 'all' | 'trending' | 'reorder' | 'fbt' | 'smartqty') {
    this.activeFilter.set(type);
  }
}
