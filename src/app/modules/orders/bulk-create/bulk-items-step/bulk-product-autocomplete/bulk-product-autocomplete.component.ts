import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bulk-product-autocomplete',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './bulk-product-autocomplete.component.html'
})
export class BulkProductAutocompleteComponent {

  @Input() products:any[] = [];
  @Output() selectProduct = new EventEmitter<string>();

  search = signal('');

  filtered = computed(() =>
    this.products.filter(p =>
      p.name.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  pick(id:string){
    this.selectProduct.emit(id);
    this.search.set('');
  }
}
