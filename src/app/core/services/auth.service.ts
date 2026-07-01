import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { UserProfile } from '../models/rbac.model';
import { RbacService } from './rbac.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private rbac = inject(RbacService);

  // ====== USER STATE (SIGNAL) ======
  private user = signal<UserProfile | null>(null);

  // ====== ACCESS TOKEN STATE (SIGNAL) ======
  private accessToken = signal<string | null>(null);

  constructor() {
    this.loadAccessToken(); // Load saved token at startup
  }

  /* ======================================================
   *                   TOKEN METHODS
   * ====================================================== */

  setAccessToken(token: string) {
    this.accessToken.set(token);
    localStorage.setItem('access_token', token);
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  loadAccessToken() {
    const stored = localStorage.getItem('access_token');
    if (stored) {
      this.accessToken.set(stored);
    }
  }

  clearAccessToken() {
    this.accessToken.set(null);
    localStorage.removeItem('access_token');
  }

  getToken() {
    return this.getAccessToken();
  }

  /* ======================================================
   *                  MOCK REFRESH TOKEN
   * ====================================================== */

  refreshToken() {
    return of({
      accessToken: 'mock_access_token_' + Math.random().toString(36).substring(2)
    }).pipe(delay(800)); // simulate network
  }

  /* ======================================================
   *                  ROLE-SWITCH LOGIN (DEV)
   * ====================================================== */

  loginAsAdmin() {
    const user: UserProfile = {
      id: '1',
      name: 'Admin User',
      email: 'admin@fruitlink.com',
      role: 'admin',
      permissions: [
        'dashboard.view',

        'orders.view', 'orders.create', 'orders.approve',
        'orders.delivery.update', 'orders.details.view',

        'fruits.view', 'fruits.add', 'fruits.edit', 'fruits.delete',

        'reports.weekly', 'reports.monthly', 'reports.yearly',
        'reports.topfruits', 'reports.pendingpayments', 'reports.shopfrequency',

        'delivery.view', 'delivery.gps', 'delivery.routeopt',

        'shop.view', 'shop.fruits', 'shop.orders', 'shop.payments', 'shop.support',

        'payments.view', 'payments.details.view',
        'payments.checkout', 'payments.history.view',

        'rbac.roles.view', 'rbac.roles.create', 'rbac.roles.edit', 'rbac.roles.delete',
        'rbac.matrix.view', 'rbac.matrix.edit', 'rbac.manage',

        'analytics.admin', 'analytics.inventory',

        'helpdesk.view', 'helpdesk.details.view', 'helpdesk.faq',

        'master.cities.view', 'master.cities.manage',
        'master.shoptypes.view', 'master.shoptypes.manage',
        'master.fruitcategories.view', 'master.fruitcategories.manage',

        'audit.view',

        'profile.view', 'profile.update',
        'settings.view', 'settings.update'
      ]
    };

    this.user.set(user);
    this.rbac.setUser(user);

    // set token
    this.setAccessToken('mock-admin-token');
  }

  loginAsShop() {
    const user: UserProfile = {
      id: '2',
      name: 'Shop Manager',
      email: 'shop@fruitlink.com',
      role: 'shop',
      permissions: [
        'dashboard.view',
        'orders.view',
        'orders.create',
        'shop.view'
      ]
    };

    this.user.set(user);
    this.rbac.setUser(user);

    this.setAccessToken('mock-shop-token');
  }

  loginAsDelivery() {
    const user: UserProfile = {
      id: '3',
      name: 'Delivery Staff',
      email: 'delivery@fruitlink.com',
      role: 'delivery',
      permissions: [
        'dashboard.view',
        'delivery.view',
        'orders.view'
      ]
    };

    this.user.set(user);
    this.rbac.setUser(user);

    this.setAccessToken('mock-delivery-token');
  }

  /* ======================================================
   *                 REAL LOGIN (when API ready)
   * ====================================================== */

  login(payload: { email: string; password: string }) {
    return this.http.post<{ user: UserProfile; accessToken: string }>(
      '/api/auth/login',
      payload,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.user.set(res.user);
        this.rbac.setUser(res.user);
        this.setAccessToken(res.accessToken);
      }
    });
  }

  /* ======================================================
   *                 USER & LOGOUT METHODS
   * ====================================================== */

  currentUser(): UserProfile | null {
    return this.user();
  }

  getUser(): UserProfile | null {
    return this.user();
  }

  updateUser(update: Partial<UserProfile>) {
    const u = this.user();
    if (!u) return;

    const newUser = { ...u, ...update };
    this.user.set(newUser);
    this.rbac.setUser(newUser);
  }

  isLoggedIn(): boolean {
    return this.user() !== null && this.getAccessToken() !== null;
  }

  logout() {
    this.user.set(null);
    this.rbac.setUser(null);
    this.clearAccessToken();
  }
}
