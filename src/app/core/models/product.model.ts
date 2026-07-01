import { UnitDefinition } from "./unit.model";

export interface Product {
  id: string;
  name: string;
  baseUnit?: 'kg';           // keep base unit explicit
  unitOptions: UnitDefinition[];  // supported units for product
  // other fields (stock, category...)
}
