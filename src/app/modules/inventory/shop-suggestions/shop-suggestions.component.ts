import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-shop-suggestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-suggestions.component.html'
})
export class ShopSuggestionsComponent {
  
  suggestion = inject(SuggestionService);

  ngOnInit() {
    this.suggestion.calculateSuggestions();
  }

  // ✅ FIX: Safe helper method
  getItemName(itemId: string): string {
    const item = this.suggestion.items().find(i => i.id === itemId);
    return item?.name || 'Unknown Item';
  }
}
