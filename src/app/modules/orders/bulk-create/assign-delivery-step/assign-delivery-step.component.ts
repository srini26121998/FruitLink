import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-assign-delivery-step',
  imports: [CommonModule],
  template: `
  <div class="bg-white p-2 rounded-xl shadow">

    <h2 class="text-base font-medium mb-2">Assign Delivery</h2>

    <label class="block mb-3 text-sm font-medium">Delivery Staff</label>
    <select class="border px-3 py-2 rounded w-full">
      <option>Ravi (Van 1)</option>
      <option>Suresh (Van 2)</option>
      <option>Arjun (Bike A)</option>
    </select>

    <label class="block mt-2 mb-3 text-sm font-medium">Route</label>
    <select class="border px-3 py-2 rounded w-full">
      <option>Route A - Anna Nagar</option>
      <option>Route B - T Nagar</option>
      <option>Route C - Koyambedu</option>
    </select>

    <div class="flex justify-between mt-2">
      <button class="px-2 py-2 bg-gray-300 rounded" (click)="back.emit()">Back</button>
      <button class="px-2 py-2 bg-green-600 text-white rounded" (click)="next.emit()">Next</button>
    </div>

  </div>
  `
})
export class AssignDeliveryStepComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
