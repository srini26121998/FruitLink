import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomerDrilldownComponent } from '../customer/customer-drilldown/customer-drilldown.component';
import { ProductSalesComponent } from '../product-sales/product-sales.component';
import { CityDrilldownComponent } from '../city/city-drilldown/city-drilldown.component';

@Component({
  selector: 'app-drilldown-host',
  standalone: true,
  imports: [
    CommonModule,
    CustomerDrilldownComponent,
    ProductSalesComponent,
    CityDrilldownComponent
  ],
  template: `
    @switch (entity()) {

      @case ('customer') {
        <app-customer-drilldown />
      }

      @case ('product') {
        <app-product-sales />
      }

      @case ('city') {
        <app-city-drilldown />
      }

      @default {
        <div class="p-2 text-red-600 font-semibold">
          Invalid drilldown type
        </div>
      }
    }
  `
})
export class DrilldownHostComponent {

  private readonly route = inject(ActivatedRoute);

  readonly entity = computed(() =>
    this.route.snapshot.paramMap.get('entity')
  );
}
