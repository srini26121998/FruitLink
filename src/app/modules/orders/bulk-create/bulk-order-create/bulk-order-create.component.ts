import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStepperComponent } from '../../../../shared/components/order-stepper/order-stepper.component';
import { SelectDateStepComponent } from '../select-date-step/select-date-step.component';
import { SelectShopsStepComponent } from '../select-shops-step/select-shops-step.component';
import { AssignDeliveryStepComponent } from '../assign-delivery-step/assign-delivery-step.component';
import { BulkItemsStepComponent } from '../bulk-items-step/bulk-items-step.component';
import { ReviewStepComponent } from '../review-step/review-step.component';
import { ConfirmStepComponent } from '../confirm-step/confirm-step.component';

@Component({
  standalone: true,
  selector: 'app-bulk-order-create',
  imports: [
    CommonModule,
    OrderStepperComponent,
    SelectDateStepComponent,
    SelectShopsStepComponent,
    BulkItemsStepComponent,
    AssignDeliveryStepComponent,
    ReviewStepComponent,
    ConfirmStepComponent
  ],
  template: `
  <div class="p-6">
    <app-order-stepper [step]="step()" [steps]="steps"></app-order-stepper>

    <div class="mt-6">
      @switch(step()) {
        @case(1) { <app-select-date-step (next)="next()"/> }
        @case(2) { <app-select-shops-step (next)="next()" (back)="back()"/> }
        @case(3) { <app-bulk-items-step (next)="next()" (back)="back()"/> }
        @case(4) { <app-assign-delivery-step (next)="next()" (back)="back()"/> }
        @case(5) { <app-review-step (next)="next()" (back)="back()"/> }
        @case(6) { <app-confirm-step (back)="back()"/> }
      }
    </div>
  </div>
  `
})
export class BulkOrderCreateComponent {
  step = signal(1);

  steps = [
    'Select Date',
    'Select Shops',
    'Add Items',
    'Assign Delivery',
    'Review',
    'Confirm'
  ];

  next() { this.step.update(s => s + 1); }
  back() { this.step.update(s => s - 1); }
}
