import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← required for ngModel

@Component({
  standalone: true,
  selector: 'app-select-date-step',
  imports: [CommonModule, FormsModule], // ← added here
  template: `
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
    <h2 class="text-xl font-semibold mb-4">Select Delivery Date</h2>

    <label class="block mb-3 text-sm font-medium">Delivery Date</label>
    <input type="date"
      [(ngModel)]="deliveryDate"
      class="border rounded px-3 py-2 w-full"/>

    <div class="flex justify-end mt-6">
      <button
        [disabled]="!deliveryDate"
        class="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        (click)="next.emit()">
        Next →
      </button>
    </div>
  </div>
  `
})
export class SelectDateStepComponent {
  @Output() next = new EventEmitter<void>();
  deliveryDate = '';
}
