import { Injectable, signal, computed } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopsService {

  private shops = signal<any[]>([]);         // All shops
  selectedShops = signal<any[]>([]);         // Selected by admin
  deliveryDate = signal<string>('');         // Step 1

  constructor() {}

  // Step 1 – set date
  setDeliveryDate(date: string) {
    this.deliveryDate.set(date);
  }

  // Fetch shops for that day (mock)
  loadShopsForDate(date: string) {
    const mock = [
      { id: '1', name: 'Sai Fruits', area: 'Anna Nagar', lastOrder: '2 days ago' },
      { id: '2', name: 'Green Mart', area: 'T Nagar', lastOrder: '1 day ago' },
      { id: '3', name: 'Fresh Farm', area: 'Vadapalani', lastOrder: '5 days ago' },
    ];

    return of(mock).pipe(delay(400)).subscribe(res => {
      this.shops.set(res);
    });
  }

  // Step 2 – update selected shops
  setSelectedShops(list: any[]) {
    this.selectedShops.set(list);
  }

  getShops() {
    return this.shops();
  }
}
