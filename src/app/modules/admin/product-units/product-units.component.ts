import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitService } from '../../../core/services/unit.service';

@Component({
  selector: 'app-product-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-units.component.html'
})
export class ProductUnitsComponent {
  unit = inject(UnitService);

  // copy to allow editing (in-memory; connect to API to persist)
  units = [...this.unit.globalUnits];
}
