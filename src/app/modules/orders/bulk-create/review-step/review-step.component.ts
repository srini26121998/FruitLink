import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCartService } from './../../../../core/services/order-cart.service';

@Component({
  standalone: true,
  selector: 'app-review-step',
  imports: [CommonModule],
  template: `
  <div class="bg-white p-2 rounded-xl shadow">

    <h2 class="text-base font-medium mb-2">Review Orders</h2>

    <div class="overflow-auto border rounded mb-2 max-h-[60vh]">
      @for(entry of shopEntries; track entry.shopId) {
        <div class="p-2 border-b">
          <h3 class="font-medium text-base">{{ entry.shopName }}</h3>

          <table class="w-full mt-3 text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-2 text-left">Item</th>
                <th class="p-2 text-right">Qty</th>
                <th class="p-2 text-right">Price</th>
                <th class="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              @for(item of entry.items; track item.productId) {
                <tr>
                  <td class="p-2">{{ item.name }}</td>
                  <td class="p-2 text-right">{{ item.qty }} kg</td>
                  <td class="p-2 text-right">₹{{ item.price }}</td>
                  <td class="p-2 text-right font-medium">₹{{ item.total }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>

    <div class="flex justify-between">
      <button class="px-2 py-2 bg-gray-300 rounded" (click)="back.emit()">Back</button>
      <button class="px-2 py-2 bg-green-600 text-white rounded" (click)="next.emit()">Confirm Orders</button>
    </div>

  </div>
  `
})
export class ReviewStepComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  shopEntries: any[] = [];

  constructor(private cartService: OrderCartService) {}

  ngOnInit() {
    this.shopEntries = [];
  }
}
