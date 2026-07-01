export interface UnitDefinition {
  id: string;                // e.g. 'kg' | 'crate' | 'box'
  label: string;             // 'kg', 'Crate (10kg)'
  conversionToKg: number;    // how many kg in 1 unit (kg:1, crate:10, box:5)
  default?: boolean;         // preferred/default unit for display
}
