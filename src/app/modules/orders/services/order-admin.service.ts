import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  unitLabel: string;
  qtyKg: number;
  pricePerKg: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  shop: string;
  date: string;
  slot?: string;
  qty?: number;
  status: number;        // 0-5 mapped to statuses[]
  orderType: 'daily' | 'bulk';
  items: OrderItem[];
  total: number;
  discount: number;
  createdAt: string;
  createdBy: string;
}

@Injectable({ providedIn: 'root' })
export class OrderAdminService {

  orders = signal<Order[]>([
    {
      id: 'ORD-1001',
      shop: 'Anna Fruit Store',
      date: '2026-07-03',
      slot: '5AM - 7AM',
      qty: 48,
      status: 0,
      orderType: 'daily',
      items: [
        { id: 'P001', name: 'Fresh Apples (Premium)', category: 'Fruits', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 180, lineTotal: 1800 },
        { id: 'V001', name: 'Tomato', category: 'Vegetables', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 40, lineTotal: 200 },
        { id: 'D001', name: 'Milk (Full Cream)', category: 'Daily Consumables', qty: 10, unitLabel: 'litre', qtyKg: 10, pricePerKg: 58, lineTotal: 580 },
      ],
      total: 2580,
      discount: 80,
      createdAt: '2026-07-03T05:10:00',
      createdBy: 'Shop Manager'
    },
    {
      id: 'ORD-1002',
      shop: 'Fresh Mart',
      date: '2026-07-03',
      slot: '7AM - 9AM',
      qty: 32,
      status: 1,
      orderType: 'daily',
      items: [
        { id: 'P002', name: 'Alphonso Mangoes', category: 'Fruits', qty: 8, unitLabel: 'kg', qtyKg: 8, pricePerKg: 350, lineTotal: 2800 },
        { id: 'G002', name: 'Rice (Sona Masoori)', category: 'Groceries', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 65, lineTotal: 650 },
        { id: 'V002', name: 'Onion', category: 'Vegetables', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 35, lineTotal: 175 },
      ],
      total: 3625,
      discount: 120,
      createdAt: '2026-07-03T06:00:00',
      createdBy: 'Shop Manager'
    },
    {
      id: 'ORD-1003',
      shop: 'Green Leaf Market',
      date: '2026-07-03',
      slot: '6AM - 8AM',
      qty: 55,
      status: 2,
      orderType: 'daily',
      items: [
        { id: 'V003', name: 'Potato', category: 'Vegetables', qty: 20, unitLabel: 'kg', qtyKg: 20, pricePerKg: 30, lineTotal: 600 },
        { id: 'V007', name: 'Carrot', category: 'Vegetables', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 55, lineTotal: 550 },
        { id: 'G004', name: 'Cooking Oil (Sunflower)', category: 'Groceries', qty: 5, unitLabel: 'litre', qtyKg: 5, pricePerKg: 150, lineTotal: 750 },
        { id: 'D004', name: 'Eggs (Farm Fresh)', category: 'Daily Consumables', qty: 10, unitLabel: 'dozen', qtyKg: 10, pricePerKg: 80, lineTotal: 800 },
      ],
      total: 2700,
      discount: 0,
      createdAt: '2026-07-03T05:45:00',
      createdBy: 'Shop Owner'
    },
    {
      id: 'ORD-1004',
      shop: 'Juice Hub',
      date: '2026-07-02',
      slot: '5AM - 7AM',
      qty: 30,
      status: 3,
      orderType: 'daily',
      items: [
        { id: 'P004', name: 'Sweet Oranges', category: 'Fruits', qty: 15, unitLabel: 'kg', qtyKg: 15, pricePerKg: 90, lineTotal: 1350 },
        { id: 'P006', name: 'Watermelon', category: 'Fruits', qty: 10, unitLabel: 'piece', qtyKg: 10, pricePerKg: 45, lineTotal: 450 },
        { id: 'G001', name: 'Sugar', category: 'Groceries', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 45, lineTotal: 225 },
      ],
      total: 2025,
      discount: 50,
      createdAt: '2026-07-02T05:15:00',
      createdBy: 'Shop Manager'
    },
    {
      id: 'ORD-1005',
      shop: 'Morning Dew',
      date: '2026-07-02',
      slot: '6AM - 8AM',
      qty: 25,
      status: 4,
      orderType: 'daily',
      items: [
        { id: 'D002', name: 'Curd', category: 'Daily Consumables', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 55, lineTotal: 550 },
        { id: 'D003', name: 'Bread (White)', category: 'Daily Consumables', qty: 5, unitLabel: 'pack', qtyKg: 5, pricePerKg: 40, lineTotal: 200 },
        { id: 'P003', name: 'Organic Bananas', category: 'Fruits', qty: 10, unitLabel: 'dozen', qtyKg: 10, pricePerKg: 60, lineTotal: 600 },
      ],
      total: 1350,
      discount: 0,
      createdAt: '2026-07-02T06:30:00',
      createdBy: 'Shop Owner'
    },
    {
      id: 'ORD-1006',
      shop: 'Berry Good',
      date: '2026-07-01',
      slot: '5AM - 7AM',
      qty: 40,
      status: 5,
      orderType: 'daily',
      items: [
        { id: 'P005', name: 'Red Grapes (Seedless)', category: 'Fruits', qty: 15, unitLabel: 'kg', qtyKg: 15, pricePerKg: 120, lineTotal: 1800 },
        { id: 'P007', name: 'Pomegranate', category: 'Fruits', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 200, lineTotal: 2000 },
        { id: 'G006', name: 'Toor Dal', category: 'Groceries', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 130, lineTotal: 650 },
      ],
      total: 4450,
      discount: 200,
      createdAt: '2026-07-01T05:00:00',
      createdBy: 'Shop Manager'
    },
    {
      id: 'ORD-1007',
      shop: 'Sunny Sides',
      date: '2026-07-03',
      slot: '7AM - 9AM',
      qty: 60,
      status: 1,
      orderType: 'bulk',
      items: [
        { id: 'P001', name: 'Fresh Apples (Premium)', category: 'Fruits', qty: 25, unitLabel: 'kg', qtyKg: 25, pricePerKg: 180, lineTotal: 4500 },
        { id: 'P002', name: 'Alphonso Mangoes', category: 'Fruits', qty: 15, unitLabel: 'kg', qtyKg: 15, pricePerKg: 350, lineTotal: 5250 },
        { id: 'V001', name: 'Tomato', category: 'Vegetables', qty: 20, unitLabel: 'kg', qtyKg: 20, pricePerKg: 40, lineTotal: 800 },
      ],
      total: 10550,
      discount: 500,
      createdAt: '2026-07-03T04:30:00',
      createdBy: 'Admin'
    },
    {
      id: 'ORD-1008',
      shop: 'Daily Squeeze',
      date: '2026-07-03',
      slot: '5AM - 7AM',
      qty: 28,
      status: 0,
      orderType: 'daily',
      items: [
        { id: 'P004', name: 'Sweet Oranges', category: 'Fruits', qty: 20, unitLabel: 'kg', qtyKg: 20, pricePerKg: 90, lineTotal: 1800 },
        { id: 'P010', name: 'Pineapple', category: 'Fruits', qty: 8, unitLabel: 'piece', qtyKg: 8, pricePerKg: 55, lineTotal: 440 },
      ],
      total: 2240,
      discount: 0,
      createdAt: '2026-07-03T05:30:00',
      createdBy: 'Shop Manager'
    },
    {
      id: 'ORD-1009',
      shop: 'Citrus Stand',
      date: '2026-07-02',
      slot: '6AM - 8AM',
      qty: 35,
      status: 5,
      orderType: 'daily',
      items: [
        { id: 'P004', name: 'Sweet Oranges', category: 'Fruits', qty: 25, unitLabel: 'kg', qtyKg: 25, pricePerKg: 90, lineTotal: 2250 },
        { id: 'D006', name: 'Paneer', category: 'Daily Consumables', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 320, lineTotal: 1600 },
        { id: 'G008', name: 'Tea Powder', category: 'Groceries', qty: 2, unitLabel: 'kg', qtyKg: 2, pricePerKg: 380, lineTotal: 760 },
      ],
      total: 4610,
      discount: 150,
      createdAt: '2026-07-02T06:00:00',
      createdBy: 'Shop Owner'
    },
    {
      id: 'ORD-1010',
      shop: 'Mango Magic',
      date: '2026-07-03',
      slot: '5AM - 7AM',
      qty: 45,
      status: 2,
      orderType: 'bulk',
      items: [
        { id: 'P002', name: 'Alphonso Mangoes', category: 'Fruits', qty: 30, unitLabel: 'kg', qtyKg: 30, pricePerKg: 350, lineTotal: 10500 },
        { id: 'P009', name: 'Guava', category: 'Fruits', qty: 15, unitLabel: 'kg', qtyKg: 15, pricePerKg: 80, lineTotal: 1200 },
      ],
      total: 11700,
      discount: 700,
      createdAt: '2026-07-03T04:45:00',
      createdBy: 'Admin'
    },
  ]);

  statuses = [
    'Order Placed',
    'Approved',
    'Order Received',
    'Order Ready',
    'Out for Delivery',
    'Delivered',
    'Completed'
  ];

  statusColors: { [key: number]: { bg: string; text: string; border: string } } = {
    0: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    1: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    2: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    3: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    4: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    5: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
    6: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  };

  updateOrderStatus(orderId: string, step: number) {
    this.orders.set(
      this.orders().map(o =>
        o.id === orderId ? { ...o, status: step } : o
      )
    );
  }

  addOrder(order: Order) {
    this.orders.update(list => [order, ...list]);
  }

  mockAssignDriver(orderId: string, driver: string) {
    this.updateOrderStatus(orderId, 3);
  }

  fetchOrders() {
    return of(this.orders()).pipe(delay(600));
  }

  getOrderById(orderId: string): Order | any {
    const found = this.orders().find(o => o.id === orderId);
    if (found) return found;

    // Fallback mock data to ensure UI displays correctly for any prototype ID
    return {
      id: orderId,
      shop: 'Juice Hub (Mock)',
      date: new Date().toISOString().split('T')[0],
      status: 0,
      orderType: 'daily' as const,
      items: [
        { id: 'P001', name: 'Fresh Apples (Premium)', category: 'Fruits', qty: 10, unitLabel: 'kg', qtyKg: 10, pricePerKg: 180, lineTotal: 1800 },
        { id: 'P002', name: 'Alphonso Mangoes', category: 'Fruits', qty: 5, unitLabel: 'kg', qtyKg: 5, pricePerKg: 350, lineTotal: 1750 },
        { id: 'V001', name: 'Tomato', category: 'Vegetables', qty: 3, unitLabel: 'kg', qtyKg: 3, pricePerKg: 40, lineTotal: 120 },
      ],
      total: 3670,
      discount: 140,
      createdAt: new Date().toISOString(),
      createdBy: 'Shop Manager'
    };
  }

  getOrderLogs(orderId: string) {
    return [
      { text: 'Order Placed', by: 'Shop Manager', time: '2026-07-03 05:10 AM' },
      { text: 'Approved by Admin', by: 'Super Admin', time: '2026-07-03 05:25 AM' },
      { text: 'Items Packed', by: 'Warehouse Team', time: '2026-07-03 06:00 AM' },
      { text: 'Driver Assigned', by: 'Dispatch Team', time: '2026-07-03 06:15 AM' },
    ];
  }

  generateOrderId(): string {
    const maxId = this.orders().reduce((max, o) => {
      const num = parseInt(o.id.replace('ORD-', ''), 10);
      return num > max ? num : max;
    }, 1000);
    return `ORD-${maxId + 1}`;
  }

  // ── Analytics helpers ──
  get todayOrders(): Order[] {
    const today = new Date().toISOString().split('T')[0];
    return this.orders().filter(o => o.date === today);
  }

  get pendingCount(): number {
    return this.orders().filter(o => o.status === 0).length;
  }

  get approvedCount(): number {
    return this.orders().filter(o => o.status === 1).length;
  }

  get deliveredCount(): number {
    return this.orders().filter(o => o.status === 5 || o.status === 6).length;
  }

  get totalRevenue(): number {
    return this.orders().reduce((sum, o) => sum + o.total, 0);
  }
}
