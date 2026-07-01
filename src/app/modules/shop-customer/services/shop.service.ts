import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// ------------------- INTERFACES -------------------

export interface DashboardSummary {
  totalFruits: number;
  totalOrders: number;
  cartCount: number;
  pendingDelivery: number;
  completedOrders: number;
  totalPayment: number;
}

export interface RecentOrder {
  id: number;
  customer: string;
  status: string;
  total: number;
}

export interface NotificationItem {
  id: number;
  message: string;
  date: Date;
}

export interface FruitItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface OrderDetails {
  id: number;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  date: Date;
}

export interface PaymentHistoryItem {
  id: number;
  amount: number;
  status: string;
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class ShopService {

  constructor() {}

  // ----------------------------------------------------
  // DASHBOARD
  // ----------------------------------------------------
  getDashboardSummary(): Observable<DashboardSummary> {
    return of({
      totalFruits: 120,
      totalOrders: 45,
      cartCount: 8,
      pendingDelivery: 5,
      completedOrders: 240,
      totalPayment: 154000
    });
  }

  getRecentOrders(): Observable<RecentOrder[]> {
    return of([
      { id: 101, customer: 'Arun', status: 'Pending', total: 1200 },
      { id: 102, customer: 'Kumar', status: 'Processing', total: 950 },
      { id: 103, customer: 'Siva', status: 'Delivered', total: 1800 },
      { id: 104, customer: 'Bala', status: 'Delivered', total: 2100 }
    ]);
  }

  getNotifications(): Observable<NotificationItem[]> {
    return of([
      { id: 1, message: 'New order received', date: new Date() },
      { id: 2, message: 'Payment received successfully', date: new Date() },
      { id: 3, message: 'Stock alert: Mango low', date: new Date() }
    ]);
  }

  // ----------------------------------------------------
  // FRUITS
  // ----------------------------------------------------
  getFruitsList(): Observable<FruitItem[]> {
    return of([
      { id: 1, name: 'Apple', price: 150, stock: 30, image: 'apple.jpg' },
      { id: 2, name: 'Banana', price: 50, stock: 80, image: 'banana.jpg' },
      { id: 3, name: 'Orange', price: 80, stock: 60, image: 'orange.jpg' },
      { id: 4, name: 'Mango', price: 120, stock: 10, image: 'mango.jpg' }
    ]);
  }

  // ----------------------------------------------------
  // CART
  // ----------------------------------------------------
  getCartItems(): Observable<CartItem[]> {
    return of([
      { id: 1, name: 'Apple', qty: 2, price: 150 },
      { id: 2, name: 'Banana', qty: 5, price: 50 }
    ]);
  }

  addToCart(payload: any): Observable<any> {
    console.log('Add to Cart:', payload);
    return of({ success: true });
  }

  updateCartItem(payload: any): Observable<any> {
    console.log('Update Cart:', payload);
    return of({ success: true });
  }

  removeCartItem(cartId: number): Observable<any> {
    console.log('Remove Cart Item:', cartId);
    return of({ success: true });
  }

  // ----------------------------------------------------
  // CHECKOUT
  // ----------------------------------------------------
  placeOrder(payload: any): Observable<any> {
    console.log('Place Order:', payload);
    return of({
      success: true,
      orderId: Math.floor(Math.random() * 90000) + 10000
    });
  }

  // ----------------------------------------------------
  // ORDERS
  // ----------------------------------------------------
  getOrdersList(): Observable<any[]> {
    return of([
      { id: 101, status: 'Pending', total: 1200, date: new Date() },
      { id: 102, status: 'Processing', total: 950, date: new Date() },
      { id: 103, status: 'Delivered', total: 1800, date: new Date() }
    ]);
  }

  getOrderDetails(orderId: number): Observable<OrderDetails> {
    return of({
      id: orderId,
      customer: 'Arun',
      items: [
        { name: 'Apple', qty: 2, price: 150 },
        { name: 'Banana', qty: 5, price: 50 }
      ],
      total: 1200,
      status: 'Pending',
      date: new Date()
    });
  }

  // ----------------------------------------------------
  // PAYMENTS
  // ----------------------------------------------------
  getPaymentHistory(): Observable<PaymentHistoryItem[]> {
    return of([
      { id: 201, amount: 1500, status: 'Success', date: new Date() },
      { id: 202, amount: 900, status: 'Success', date: new Date() },
      { id: 203, amount: 2200, status: 'Failed', date: new Date() }
    ]);
  }

  // ----------------------------------------------------
  // SUPPORT
  // ----------------------------------------------------
  sendSupportMessage(payload: any): Observable<any> {
    console.log('Support Message:', payload);
    return of({
      success: true,
      ticketId: Math.floor(Math.random() * 9000) + 1000
    });
  }
}
