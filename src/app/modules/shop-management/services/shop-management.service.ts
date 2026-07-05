import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface Shop {
  id: string;
  name: string;
  type: 'Supermarket' | 'Grocery' | 'Wholesale' | 'Retail';
  status: 'Active' | 'Inactive' | 'Suspended';
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  creditLimit: number;
  currentCredit: number;
  assignedSalesman: string;
  createdAt: Date;
  updatedAt: Date;
  username?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopManagementService {
  private mockShops: Shop[] = [
    {
      id: 'SHP-001',
      name: 'Fresh Mart Downtown',
      type: 'Supermarket',
      status: 'Active',
      ownerName: 'Rahul Sharma',
      phone: '+91 9876543210',
      email: 'rahul.freshmart@test.com',
      address: '123 Main St, Downtown, City',
      creditLimit: 50000,
      currentCredit: 12500,
      assignedSalesman: 'Amit Kumar',
      createdAt: new Date('2025-01-15T10:00:00Z'),
      updatedAt: new Date('2025-06-20T14:30:00Z')
    },
    {
      id: 'SHP-002',
      name: 'Daily Groceries',
      type: 'Grocery',
      status: 'Active',
      ownerName: 'Priya Singh',
      phone: '+91 9876543211',
      email: 'priya.daily@test.com',
      address: '45 West Avenue, City',
      creditLimit: 20000,
      currentCredit: 18000,
      assignedSalesman: 'Vikram Singh',
      createdAt: new Date('2025-02-10T11:00:00Z'),
      updatedAt: new Date('2025-06-25T09:15:00Z')
    },
    {
      id: 'SHP-003',
      name: 'City Wholesale Traders',
      type: 'Wholesale',
      status: 'Inactive',
      ownerName: 'Mohammed Ali',
      phone: '+91 9876543212',
      email: 'ali.traders@test.com',
      address: 'Industrial Area, Phase 1',
      creditLimit: 150000,
      currentCredit: 0,
      assignedSalesman: 'Suresh Patel',
      createdAt: new Date('2025-03-05T09:30:00Z'),
      updatedAt: new Date('2025-05-15T16:45:00Z')
    },
    {
      id: 'SHP-004',
      name: 'Green Leaf Retail',
      type: 'Retail',
      status: 'Active',
      ownerName: 'Anjali Desai',
      phone: '+91 9876543213',
      email: 'anjali.greenleaf@test.com',
      address: 'Sector 4 Market',
      creditLimit: 30000,
      currentCredit: 5000,
      assignedSalesman: 'Amit Kumar',
      createdAt: new Date('2025-04-12T13:20:00Z'),
      updatedAt: new Date('2025-06-28T10:10:00Z')
    },
    {
      id: 'SHP-005',
      name: 'Sunrise Superstore',
      type: 'Supermarket',
      status: 'Suspended',
      ownerName: 'Deepak Verma',
      phone: '+91 9876543214',
      email: 'deepak.sunrise@test.com',
      address: 'High Street Mall',
      creditLimit: 100000,
      currentCredit: 95000,
      assignedSalesman: 'Vikram Singh',
      createdAt: new Date('2025-05-01T15:45:00Z'),
      updatedAt: new Date('2025-06-30T11:20:00Z')
    }
  ];

  private shopsSubject = new BehaviorSubject<Shop[]>(this.mockShops);
  public shops$ = this.shopsSubject.asObservable();

  constructor() { }

  getShops(): Observable<Shop[]> {
    return this.shops$.pipe(delay(300));
  }

  getDashboardStats(): Observable<any> {
    const stats = {
      totalShops: this.mockShops.length,
      activeShops: this.mockShops.filter(s => s.status === 'Active').length,
      pendingOrders: 42,
      deliveredOrders: 156,
      monthlyOrders: 850,
      shopPerformance: [
        { id: 'SHP-001', name: 'Fresh Mart Downtown', orders: 120, rating: 4.8 },
        { id: 'SHP-002', name: 'Daily Groceries', orders: 95, rating: 4.5 },
        { id: 'SHP-004', name: 'Green Leaf Retail', orders: 85, rating: 4.2 }
      ]
    };
    return of(stats).pipe(delay(300));
  }

  getShopById(id: string): Observable<Shop | undefined> {
    return this.shops$.pipe(
      map(shops => shops.find(s => s.id === id)),
      delay(200)
    );
  }

  addShop(shop: Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>): Observable<Shop> {
    const newShop: Shop = {
      ...shop,
      id: `SHP-${String(this.mockShops.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockShops = [newShop, ...this.mockShops];
    this.shopsSubject.next(this.mockShops);
    return of(newShop).pipe(delay(300));
  }

  updateShop(id: string, updates: Partial<Shop>): Observable<Shop | undefined> {
    const index = this.mockShops.findIndex(s => s.id === id);
    if (index > -1) {
      this.mockShops[index] = { ...this.mockShops[index], ...updates, updatedAt: new Date() };
      this.shopsSubject.next(this.mockShops);
      return of(this.mockShops[index]).pipe(delay(300));
    }
    return of(undefined);
  }

  deleteShop(id: string): Observable<boolean> {
    const initialLength = this.mockShops.length;
    this.mockShops = this.mockShops.filter(s => s.id !== id);
    this.shopsSubject.next(this.mockShops);
    return of(this.mockShops.length < initialLength).pipe(delay(300));
  }
}
