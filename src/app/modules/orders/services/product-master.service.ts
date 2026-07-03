import { Injectable, signal } from '@angular/core';

export interface MasterProduct {
  id: string;
  name: string;
  category: 'Fruits' | 'Vegetables' | 'Groceries' | 'Daily Consumables';
  unit: string;
  pricePerUnit: number;
  available: boolean;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductMasterService {

  private products = signal<MasterProduct[]>([
    // ── Fruits ──
    { id: 'P001', name: 'Fresh Apples (Premium)', category: 'Fruits', unit: 'kg', pricePerUnit: 180, available: true },
    { id: 'P002', name: 'Alphonso Mangoes', category: 'Fruits', unit: 'kg', pricePerUnit: 350, available: true },
    { id: 'P003', name: 'Organic Bananas', category: 'Fruits', unit: 'dozen', pricePerUnit: 60, available: true },
    { id: 'P004', name: 'Sweet Oranges', category: 'Fruits', unit: 'kg', pricePerUnit: 90, available: true },
    { id: 'P005', name: 'Red Grapes (Seedless)', category: 'Fruits', unit: 'kg', pricePerUnit: 120, available: true },
    { id: 'P006', name: 'Watermelon', category: 'Fruits', unit: 'piece', pricePerUnit: 45, available: true },
    { id: 'P007', name: 'Pomegranate', category: 'Fruits', unit: 'kg', pricePerUnit: 200, available: true },
    { id: 'P008', name: 'Papaya', category: 'Fruits', unit: 'kg', pricePerUnit: 50, available: true },
    { id: 'P009', name: 'Guava', category: 'Fruits', unit: 'kg', pricePerUnit: 80, available: true },
    { id: 'P010', name: 'Pineapple', category: 'Fruits', unit: 'piece', pricePerUnit: 55, available: true },

    // ── Vegetables ──
    { id: 'V001', name: 'Tomato', category: 'Vegetables', unit: 'kg', pricePerUnit: 40, available: true },
    { id: 'V002', name: 'Onion', category: 'Vegetables', unit: 'kg', pricePerUnit: 35, available: true },
    { id: 'V003', name: 'Potato', category: 'Vegetables', unit: 'kg', pricePerUnit: 30, available: true },
    { id: 'V004', name: 'Green Chilli', category: 'Vegetables', unit: 'kg', pricePerUnit: 60, available: true },
    { id: 'V005', name: 'Brinjal', category: 'Vegetables', unit: 'kg', pricePerUnit: 45, available: true },
    { id: 'V006', name: 'Cabbage', category: 'Vegetables', unit: 'piece', pricePerUnit: 30, available: true },
    { id: 'V007', name: 'Carrot', category: 'Vegetables', unit: 'kg', pricePerUnit: 55, available: true },
    { id: 'V008', name: 'Beans', category: 'Vegetables', unit: 'kg', pricePerUnit: 70, available: true },
    { id: 'V009', name: 'Capsicum', category: 'Vegetables', unit: 'kg', pricePerUnit: 80, available: true },
    { id: 'V010', name: 'Beetroot', category: 'Vegetables', unit: 'kg', pricePerUnit: 40, available: true },

    // ── Groceries ──
    { id: 'G001', name: 'Sugar', category: 'Groceries', unit: 'kg', pricePerUnit: 45, available: true },
    { id: 'G002', name: 'Rice (Sona Masoori)', category: 'Groceries', unit: 'kg', pricePerUnit: 65, available: true },
    { id: 'G003', name: 'Wheat Flour (Atta)', category: 'Groceries', unit: 'kg', pricePerUnit: 42, available: true },
    { id: 'G004', name: 'Cooking Oil (Sunflower)', category: 'Groceries', unit: 'litre', pricePerUnit: 150, available: true },
    { id: 'G005', name: 'Salt (Iodised)', category: 'Groceries', unit: 'kg', pricePerUnit: 22, available: true },
    { id: 'G006', name: 'Toor Dal', category: 'Groceries', unit: 'kg', pricePerUnit: 130, available: true },
    { id: 'G007', name: 'Moong Dal', category: 'Groceries', unit: 'kg', pricePerUnit: 110, available: true },
    { id: 'G008', name: 'Tea Powder', category: 'Groceries', unit: 'kg', pricePerUnit: 380, available: true },

    // ── Daily Consumables ──
    { id: 'D001', name: 'Milk (Full Cream)', category: 'Daily Consumables', unit: 'litre', pricePerUnit: 58, available: true },
    { id: 'D002', name: 'Curd', category: 'Daily Consumables', unit: 'kg', pricePerUnit: 55, available: true },
    { id: 'D003', name: 'Bread (White)', category: 'Daily Consumables', unit: 'pack', pricePerUnit: 40, available: true },
    { id: 'D004', name: 'Eggs (Farm Fresh)', category: 'Daily Consumables', unit: 'dozen', pricePerUnit: 80, available: true },
    { id: 'D005', name: 'Butter', category: 'Daily Consumables', unit: 'pack', pricePerUnit: 55, available: true },
    { id: 'D006', name: 'Paneer', category: 'Daily Consumables', unit: 'kg', pricePerUnit: 320, available: true },
    { id: 'D007', name: 'Ghee (Pure)', category: 'Daily Consumables', unit: 'litre', pricePerUnit: 550, available: true },
    { id: 'D008', name: 'Fresh Cream', category: 'Daily Consumables', unit: 'litre', pricePerUnit: 220, available: true },
  ]);

  getAll(): MasterProduct[] {
    return this.products();
  }

  getAvailable(): MasterProduct[] {
    return this.products().filter(p => p.available);
  }

  getByCategory(category: string): MasterProduct[] {
    return this.products().filter(p => p.category === category && p.available);
  }

  getCategories(): string[] {
    return [...new Set(this.products().map(p => p.category))];
  }

  getById(id: string): MasterProduct | undefined {
    return this.products().find(p => p.id === id);
  }

  addProduct(product: MasterProduct) {
    this.products.update(list => [...list, product]);
  }

  updateProduct(id: string, updates: Partial<MasterProduct>) {
    this.products.update(list =>
      list.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  }

  toggleAvailability(id: string) {
    this.products.update(list =>
      list.map(p => p.id === id ? { ...p, available: !p.available } : p)
    );
  }

  deleteProduct(id: string) {
    this.products.update(list => list.filter(p => p.id !== id));
  }

  searchProducts(term: string): MasterProduct[] {
    const lower = term.toLowerCase();
    return this.products().filter(p =>
      p.available && (
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.id.toLowerCase().includes(lower)
      )
    );
  }
}
