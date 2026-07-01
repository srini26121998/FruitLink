import { Injectable, inject, signal } from '@angular/core';
import { RbacService } from '../../core/services/rbac.service';

export interface MenuItem {
  id?: string;
  label: string;
  icon: string;
  link?: string;
  permission?: string;
  children?: MenuItem[];
  roles?: string[];
}

@Injectable({ providedIn: 'root' })
export class SidebarService {

  rbac = inject(RbacService);

  collapsed = signal(false);
  isMobile = signal(window.innerWidth < 1024);

  toggleSidebar() {
    this.collapsed.update(v => !v);
  }

  setMobile(v: boolean) {
    this.isMobile.set(v);
  }

  /** 🎯 FULL MENU (DYNAMIC ROLE + PERMISSION FILTERING) */
  getMenu(): MenuItem[] {

    const user = this.rbac.user();
    if (!user) return [];

    const isSuper = user.permissions.includes('*');

    const allow = (roles?: string[]) =>
      !roles || roles.includes(user.role) || isSuper;

    const can = (perm?: string) =>
      !perm || isSuper || user.permissions.includes(perm);

    /** -----------------------------------------
     *   📌 FULL MENU STRUCTURE (UPDATED)
     * ----------------------------------------- */
    const MENU: MenuItem[] = [

      /* ------------ DASHBOARD ------------- */
      {
        id: 'dashboard',
        label: 'Admin Dashboard',
        icon: 'dashboard',
        link: '/admin/dashboard',
        permission: 'dashboard.view'
      },

      /* ------------ SHOP CUSTOMER ------------ */
      {
        id: 'shop-customer',
        label: 'Shop Panel',
        icon: 'storefront',
        permission: 'shop.customer',
        children: [
          { label: 'Dashboard', icon: 'dashboard', link: '/shop/dashboard' },
          { label: 'Fruits', icon: 'local_mall', link: '/shop/fruits' },
          { label: 'Cart', icon: 'shopping_cart', link: '/shop/cart' },
          { label: 'Checkout', icon: 'payments', link: '/shop/checkout' },
          { label: 'Orders', icon: 'list_alt', link: '/shop/orders' },
          { label: 'Payments History', icon: 'history', link: '/shop/payments-history' },
          { label: 'Notifications', icon: 'notifications', link: '/shop/notifications' },
          { label: 'Support', icon: 'support', link: '/shop/support' }
        ]
      },

      /* ------------ ORDERS ------------- */
      {
        id: 'orders',
        label: 'Orders',
        icon: 'assignment',
        permission: 'orders.view',
        children: [
          { label: 'Order List', icon: 'list', link: '/orders/list', permission: 'orders.view' },
          { label: 'Create Order', icon: 'add', link: '/orders/create', permission: 'orders.create' },
          { label: 'Approve Orders', icon: 'verified', link: '/orders/approve', permission: 'orders.approve' }
        ]
      },

      /* ------------ PRODUCTS ------------- */
      {
        id: 'products',
        label: 'Products',
        icon: 'inventory_2',
        permission: 'products.view',
        children: [
          { label: 'Product List', icon: 'list', link: '/products/list' },
          { label: 'Add Product', icon: 'add', link: '/products/create' }
        ]
      },

      /* ------------ PAYMENTS ------------- */
      {
        id: 'payments',
        label: 'Payments',
        icon: 'payments',
        permission: 'payments.view',
        children: [
          { label: 'Checkout', icon: 'credit_card', link: '/payments/checkout' },
          { label: 'History', icon: 'history', link: '/payments/history' },
          { label: 'Ledger Dashboard', icon: 'account_balance', link: '/payments/ledger/dashboard' }
        ]
      },

      /* ------------ REPORTS ------------- */
      {
        id: 'reports',
        label: 'Reports',
        icon: 'analytics',
        permission: 'reports.view',
        children: [
          { label: 'Weekly', icon: 'bar_chart', link: '/reports/weekly' },
          { label: 'Monthly', icon: 'calendar_month', link: '/reports/monthly' },
          { label: 'Yearly', icon: 'event', link: '/reports/yearly' },
          { label: 'Top Fruits', icon: 'favorite', link: '/reports/top-fruits' },
          { label: 'Pending Payments', icon: 'pending', link: '/reports/pending-payments' },
          { label: 'Shop Frequency', icon: 'trending_up', link: '/reports/shop-frequency' }
        ]
      },

      /* ------------ DELIVERY ------------- */
      {
        id: 'delivery',
        label: 'Delivery',
        icon: 'local_shipping',
        permission: 'delivery.view',
        children: [
          { label: 'Dispatch Panel', icon: 'send', link: '/delivery/dispatch-panel' },
          { label: 'Driver Dashboard', icon: 'directions_car', link: '/delivery/driver-dashboard' },
          { label: 'GPS Tracking', icon: 'location_on', link: '/delivery/gps-tracking' },
          { label: 'Route Optimization', icon: 'map', link: '/delivery/route-optimization' }
        ]
      },

      /* ------------ ANALYTICS ------------- */
      {
        id: 'analytics',
        label: 'Analytics',
        icon: 'query_stats',
        permission: 'analytics.view',
        children: [
          { label: 'Sales Dashboard', icon: 'leaderboard', link: '/analytics/sales' },
          { label: 'Shop Analytics', icon: 'store', link: '/analytics/shop' },
          { label: 'Product Analytics', icon: 'inventory', link: '/analytics/products' },
          { label: 'Payment Analytics', icon: 'payments', link: '/analytics/payments' },
          { label: 'Delivery Analytics', icon: 'local_shipping', link: '/analytics/delivery' },
          { label: 'Growth Dashboard', icon: 'trending_up', link: '/analytics/growth' },

          // Drilldowns
          { label: 'Product Drilldown', icon: 'category', link: '/analytics/reports/product' },
          { label: 'Sales Comparison', icon: 'compare_arrows', link: '/analytics/sales/comparison' }
        ]
      },

      /* ------------ INVENTORY ------------- */
      {
        id: 'inventory',
        label: 'Inventory',
        icon: 'warehouse',
        permission: 'inventory.view',
        children: [
          { label: 'Dashboard', icon: 'dashboard', link: '/inventory/dashboard' },
          { label: 'Item Demand', icon: 'trending_up', link: '/inventory/item-demand' },
          { label: 'Shop Suggestions', icon: 'lightbulb', link: '/inventory/shop-suggestions' }
        ]
      },

      /* ------------ MASTER DATA ------------- */
      {
        id: 'master',
        label: 'Master Data',
        icon: 'dataset',
        permission: 'master.view',
        children: [
          { label: 'Cities', icon: 'location_city', link: '/master-data/cities' },
          { label: 'Shop Types', icon: 'category', link: '/master-data/shop-types' },
          { label: 'Fruit Categories', icon: 'shopping_basket', link: '/master-data/fruit-categories' }
        ]
      },

      /* ------------ HELP DESK ------------- */
      {
        id: 'helpdesk',
        label: 'Helpdesk',
        icon: 'support_agent',
        permission: 'helpdesk.view',
        children: [
          { label: 'Tickets', icon: 'list', link: '/helpdesk/list' },
          { label: 'FAQ', icon: 'help', link: '/helpdesk/faq' }
        ]
      },

      /* ------------ RBAC ------------- */
      {
        id: 'rbac',
        label: 'Roles & Permissions',
        icon: 'admin_panel_settings',
        permission: 'rbac.manage',
        children: [
          { label: 'Role List', icon: 'groups', link: '/roles/role-list' },
          { label: 'Create Role', icon: 'add', link: '/roles/create-role' },
          { label: 'Permission Matrix', icon: 'table_chart', link: '/roles/permission-matrix/1' },
          { label: 'Permission Editor', icon: 'edit', link: '/roles/permission-editor' }
        ]
      },

      /* ------------ AUDIT LOGS ------------- */
      {
        id: 'audit',
        label: 'Audit Logs',
        icon: 'fact_check',
        link: '/audit-logs/list',
        permission: 'audit.view'
      },

      /* ------------ PROFILE ------------- */
      {
        id: 'profile',
        label: 'Profile',
        icon: 'person',
        link: '/profile'
      },

      /* ------------ SETTINGS ------------- */
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        link: '/settings'
      }
    ];

    /** 🎯 FINAL FILTERED MENU */
    return MENU
      .filter(m => allow(m.roles) && can(m.permission))
      .map(m => ({
        ...m,
        children: m.children?.filter(c => allow(c.roles) && can(c.permission))
      }));
  }
}
