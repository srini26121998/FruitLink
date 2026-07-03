import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from './../../../../core/services/orders.service';

@Component({
  standalone: true,
  selector: 'app-confirm-step',
  imports: [CommonModule],
  template: `
  <div class="bg-white p-2 rounded-xl shadow text-center">

    <h2 class="text-base font-medium mb-2">Creating Bulk Orders...</h2>

    <p class="text-gray-600 mb-2">Please wait...</p>

    <div *ngIf="loading" class="text-blue-600 font-bold">Processing...</div>

    <div *ngIf="done" class="text-green-600 font-bold text-xl">
      {{ count }} Orders Created Successfully!
    </div>

    <button *ngIf="done" class="mt-2 px-2 py-2 bg-green-600 text-white rounded" (click)="back.emit()">Close</button>
  </div>
  `
})
export class ConfirmStepComponent {
  @Output() back = new EventEmitter<void>();

  loading = true;
  done = false;
  count = 0;

  constructor(private orders: OrdersService) {}

  ngOnInit() {
    this.orders.bulkCreate().subscribe(res => {
      this.count = res.length;
      this.loading = false;
      this.done = true;
    });
  }
}
