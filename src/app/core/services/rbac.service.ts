import { Injectable, signal } from '@angular/core';
import { Permission, Role, UserProfile } from '../models/rbac.model';

@Injectable({ providedIn: 'root' })
export class RbacService {

  /** CURRENT LOGGED-IN USER */
  user = signal<UserProfile | null>(null);

  /** ALL ROLES (FINAL, FIXED VERSION) */
  roles = signal<Role[]>([

    /* ============================
          ⭐ SUPER ADMIN
    ============================ */
    {
      id: 'superadmin',
      name: 'Super Admin',
      permissions: ['*']   // FIXED
    },

    /* ============================
          ⭐ ADMIN ROLE
    ============================ */
    {
      id: 'admin',
      name: 'Admin',
      permissions: [
        'dashboard.view',

        // Orders
        'orders.view', 'orders.create', 'orders.approve',
        'orders.delivery.update', 'orders.details.view',

        // Fruits / Products
        'fruits.view', 'fruits.add', 'fruits.edit', 'fruits.delete',
        'products.view', 'products.create', 'products.edit', 'products.delete',

        // Reports
        'reports.view',
        'reports.weekly', 'reports.monthly', 'reports.yearly',
        'reports.topfruits', 'reports.pendingpayments', 'reports.shopfrequency',

        // Delivery
        'delivery.view', 'delivery.gps', 'delivery.routeopt',
        'delivery.status.manage',

        // Shop
        'shop.view', 'shop.fruits', 'shop.orders', 'shop.payments', 'shop.support',
        'shop.monitor',

        // Payments
        'payments.view', 'payments.details.view', 'payments.checkout', 'payments.history.view',

        // RBAC
        'rbac.roles.view', 'rbac.roles.create', 'rbac.roles.edit',
        'rbac.roles.delete', 'rbac.matrix.view', 'rbac.matrix.edit', 'rbac.manage',

        // Analytics
        'analytics.admin', 'analytics.inventory',

        // Helpdesk
        'helpdesk.view', 'helpdesk.details.view', 'helpdesk.faq',

        // Master Data
        'master.cities.view', 'master.cities.manage',
        'master.shoptypes.view', 'master.shoptypes.manage',
        'master.fruitcategories.view', 'master.fruitcategories.manage',

        // Audit
        'audit.view',

        // Profile & Settings
        'profile.view', 'profile.update',
        'settings.view', 'settings.update',

        // Shop Management
        'shop.management.view', 'shop.management.create', 'shop.management.edit'
      ]
    },

    /* ============================
          ⭐ SHOP MANAGER
    ============================ */
    {
      id: 'shop_manager',
      name: 'Shop Manager',
      permissions: [
        'dashboard.view',
        'shop.dashboard.view',

        // Daily Orders
        'orders.view', 'orders.create', 'orders.details.view',
        'orders.history.view',
        'orders.track.view',
        'orders.print.delivery',

        // Shop self-serve
        'shop.view', 'shop.fruits', 'shop.orders', 'shop.payments', 'shop.support',

        // Payments
        'payments.history.view',

        // Profile
        'profile.view', 'profile.update'
      ]
    },

    /* ============================
          ⭐ BRANCH MANAGER
    ============================ */
    {
      id: 'branch_manager',
      name: 'Branch Manager',
      permissions: [
        'dashboard.view',
        'shop.dashboard.view',

        // Full Orders Access (like shop manager + approve)
        'orders.view', 'orders.create', 'orders.approve',
        'orders.details.view', 'orders.history.view',
        'orders.track.view', 'orders.print.delivery',

        // Shop Management
        'shop.view', 'shop.fruits', 'shop.orders', 'shop.payments', 'shop.support',
        'shop.monitor',
        'shop.management.view',

        // Reports (limited)
        'reports.view',
        'reports.weekly', 'reports.monthly',

        // Payments
        'payments.view', 'payments.history.view',

        // Profile
        'profile.view', 'profile.update'
      ]
    },

    /* ============================
          ⭐ DELIVERY STAFF
    ============================ */
    {
      id: 'delivery',
      name: 'Delivery Staff',
      permissions: [
        'delivery.view', 'delivery.gps', 'delivery.routeopt',
        'orders.view', 'orders.delivery.update'
      ]
    },

    /* ============================
          ⭐ HELP DESK STAFF
    ============================ */
    {
      id: 'helpdesk',
      name: 'Helpdesk Agent',
      permissions: [
        'helpdesk.view',
        'helpdesk.details.view',
        'helpdesk.faq'
      ]
    },

    /* ============================
          ⭐ ANALYTICS TEAM
    ============================ */
    {
      id: 'analyst',
      name: 'Data Analyst',
      permissions: [
        'analytics.admin',
        'analytics.shop',
        'analytics.inventory',
        'reports.weekly',
        'reports.monthly',
        'reports.yearly'
      ]
    },

    /* ============================
        ⭐ MASTER DATA MANAGER
    ============================ */
    {
      id: 'master',
      name: 'Master Data Manager',
      permissions: [
        'master.cities.view', 'master.cities.manage',
        'master.shoptypes.view', 'master.shoptypes.manage',
        'master.fruitcategories.view', 'master.fruitcategories.manage'
      ]
    }

  ]);

  /** ALL PERMISSIONS (you can fill using map later) */
  permissions = signal<Permission[]>([]);

  /** Set Logged-In User */
  setUser(u: UserProfile | null) {
    this.user.set(u);
  }

  /** Check Access */
  hasPermission(p: string): boolean {
    const u = this.user();
    if (!u) return false;

    // SUPER ADMIN wildcard support
    if (u.permissions.includes('*')) return true;

    return u.permissions.includes(p);
  }

  hasRole(role: string): boolean {
    return this.user()?.role === role;
  }

  /** Check if user has ANY of the given roles */
  hasAnyRole(roles: string[]): boolean {
    const userRole = this.user()?.role;
    if (!userRole) return false;
    return roles.includes(userRole);
  }

  /** Role → Permission Map for Permission Matrix */
  rolePermissions(): Record<string, string[]> {
    const map: Record<string, string[]> = {};

    this.roles().forEach(role => {
      map[role.id] = role.permissions.includes('*')
        ? ['*']
        : role.permissions;
    });

    return map;
  }

  /** Add new role dynamically */
  addRole(name: string) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const newRole: Role = { id, name, permissions: [] };
    this.roles.update(r => [...r, newRole]);
  }

  /** Delete role */
  deleteRole(roleId: string) {
    this.roles.update(r => r.filter(x => x.id !== roleId));
  }

  /** Toggle Role Permissions (Matrix) */
  togglePermission(roleId: string, permId: string) {
    this.roles.update(list =>
      list.map(role => {
        if (role.id !== roleId) return role;

        // SUPER ADMIN should not be modified
        if (role.permissions.includes('*')) return role;

        const has = role.permissions.includes(permId);

        return {
          ...role,
          permissions: has
            ? role.permissions.filter(p => p !== permId)
            : [...role.permissions, permId]
        };
      })
    );
  }

  /** Add new permission entry */
  addPermission(p: Permission) {
    this.permissions.update(list => [...list, p]);
  }
}
