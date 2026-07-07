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

      /* ------------ ADMIN DASHBOARD ------------- */
      {
        id: 'dashboard',
        label: 'Admin Dashboard',
        icon: 'dashboard',
        link: '/admin/dashboard',
        permission: 'dashboard.view',
        roles: ['admin', 'superadmin']
      },

      /* ------------ SHOP PORTAL DASHBOARD ------------- */
      {
        id: 'shop-portal-dashboard',
        label: 'My Dashboard',
        icon: 'space_dashboard',
        link: '/shop-portal/dashboard',
        permission: 'shop.dashboard.view',
        roles: ['shop_manager', 'branch_manager']
      },

      /* ------------ SHOP MANAGER: DAILY ORDERS ------------- */
      {
        id: 'shop-orders',
        label: 'My Orders',
        icon: 'receipt_long',
        permission: 'orders.view',
        roles: ['shop_manager', 'branch_manager'],
        children: [
          { label: 'Create Daily Order', icon: 'add_circle', link: '/shop-portal/create-order', permission: 'orders.create' },
          { label: 'Order History', icon: 'history', link: '/shop-portal/order-history', permission: 'orders.history.view' },
          { label: 'Track Orders', icon: 'track_changes', link: '/shop-portal/track-orders', permission: 'orders.track.view' },
          { label: 'Print Documents', icon: 'print', link: '/shop-portal/print-documents', permission: 'orders.print.delivery' }
        ]
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

      /* ------------ SHOP MANAGEMENT (ADMIN) ------------ */
      {
        id: 'shop-management',
        label: 'Shop Management',
        icon: 'store',
        roles: ['admin', 'superadmin', 'branch_manager'],
        children: [
          { label: 'Dashboard', icon: 'dashboard', link: '/shop-management/dashboard' },
          { label: 'Shop List', icon: 'list', link: '/shop-management/list' },
          { label: 'Analytics', icon: 'analytics', link: '/shop-management/analytics' },
          { label: 'Assign Salesman', icon: 'assignment_ind', link: '/shop-management/salesman-assign', roles: ['admin', 'superadmin'] },
          { label: 'Follow-ups', icon: 'support_agent', link: '/shop-management/follow-ups' },
          { label: 'Reports', icon: 'description', link: '/shop-management/reports', roles: ['admin', 'superadmin'] }
        ]
      },

      /* ------------ ORDERS (ADMIN) ------------- */
      {
        id: 'orders',
        label: 'Orders',
        icon: 'assignment',
        permission: 'orders.view',
        roles: ['admin', 'superadmin'],
        children: [
          { label: 'Order List', icon: 'list', link: '/orders/list', permission: 'orders.view' },
          { label: 'Manage Orders', icon: 'tune', link: '/orders/manage', permission: 'orders.view' }
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
          { label: 'Sales Summary', icon: 'bar_chart', link: '/reports/summary' },
          { label: 'Top Fruits', icon: 'favorite', link: '/reports/top-fruits', roles: ['admin', 'superadmin'] },
          { label: 'Pending Payments', icon: 'pending', link: '/reports/pending-payments', roles: ['admin', 'superadmin'] },
          { label: 'Shop Frequency', icon: 'trending_up', link: '/reports/shop-frequency', roles: ['admin', 'superadmin'] }
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
          { label: 'Delivery Dashboard', icon: 'directions_car', link: '/delivery/driver-dashboard' },
          { label: 'Create Driver', icon: 'person_add', link: '/delivery/driver/create' },
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
          { label: 'Fruit Categories', icon: 'shopping_basket', link: '/master-data/fruit-categories' },
          { label: 'Salesmen List', icon: 'badge', link: '/master-data/salesmen' },
          { label: 'Create Salesman', icon: 'person_add', link: '/master-data/salesmen/create' }
        ]
      },

      /* ------------ HELP DESK ------------- */
      {
        id: 'helpdesk',
        label: 'Helpdesk',
        icon: 'support_agent',
        permission: 'helpdesk.view',
        children: [
          { label: 'Tickets', icon: 'list', link: '/helpdesk/list' }
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

      /* ------------ NOTIFICATIONS ------------- */
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'notifications_active',
        children: [
          { label: 'All Notifications', icon: 'list', link: '/notifications/list' },
          { label: 'Notification Panel', icon: 'dashboard', link: '/notifications/panel' }
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
        link: '/settings',
        roles: ['admin', 'superadmin']
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
