import { Injectable } from '@angular/core';
import type { UnitDefinition } from '../models/unit.model';

@Injectable({ providedIn: 'root' })
export class UnitService {

  // Global default units (admin can override per product)
  globalUnits: UnitDefinition[] = [
    { id: 'kg', label: 'kg', conversionToKg: 1, default: true },
    { id: 'box', label: 'Box (5 kg)', conversionToKg: 5 },
    { id: 'crate', label: 'Crate (10 kg)', conversionToKg: 10 },
    { id: 'carton', label: 'Carton (20 kg)', conversionToKg: 20 }
  ];

  toKg(qty: number, unit: UnitDefinition) {
    return qty * (unit?.conversionToKg ?? 1);
  }

  // Format display label
  unitLabel(unit: UnitDefinition) {
    return unit?.label ?? `${unit?.id}`;
  }
}
