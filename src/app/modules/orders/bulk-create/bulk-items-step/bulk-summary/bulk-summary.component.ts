import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector:'bulk-summary',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./bulk-summary.component.html'
})
export class BulkSummaryComponent {

  @Input() subtotal = 0;

  discount = signal(0);     // %
  gst = 5;                  // fixed 5% example

  total = computed(() => {
    const d = this.subtotal * (this.discount()/100);
    const afterDisc = this.subtotal - d;
    const tax = afterDisc * (this.gst/100);
    return afterDisc + tax;
  });
}
