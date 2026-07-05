import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RbacService } from '../../../core/services/rbac.service';
import { OrderAdminService } from '../../orders/services/order-admin.service';

@Component({
  selector: 'app-shop-portal-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-portal-dashboard.component.html',
  styleUrls: ['./shop-portal-dashboard.component.css']
})
export class ShopPortalDashboardComponent implements OnInit {
  auth = inject(AuthService);
  rbac = inject(RbacService);
  orderAdmin = inject(OrderAdminService);

  userName = '';
  userRole = '';
  roleBadge = '';
  greeting = '';
  currentDate = '';

  // KPI data
  todayOrders = 0;
  pendingOrders = 0;
  approvedOrders = 0;
  deliveredOrders = 0;
  totalRevenue = 0;
  weeklyOrders = 0;

  // Recent orders
  recentOrders: any[] = [];

  // Quick actions based on role
  quickActions: { icon: string; label: string; link: string; color: string; description: string }[] = [];

  // Activity feed
  activityFeed: { icon: string; text: string; time: string; color: string }[] = [];

  ngOnInit() {
    const user = this.auth.currentUser();
    this.userName = user?.shopName || user?.name || 'User';
    this.userRole = user?.role || '';
    this.roleBadge = this.getRoleBadge();
    this.greeting = this.getGreeting();
    this.currentDate = new Date().toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    this.loadKPIs();
    this.loadRecentOrders();
    this.setQuickActions();
    this.loadActivityFeed();
  }

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  private getRoleBadge(): string {
    switch (this.userRole) {
      case 'shop_manager': return 'Shop Manager';
      case 'branch_manager': return 'Branch Manager';
      default: return 'Manager';
    }
  }

  private loadKPIs() {
    const orders = this.orderAdmin.orders();
    const today = new Date().toISOString().split('T')[0];

    this.todayOrders = orders.filter(o => o.date === today).length;
    this.pendingOrders = orders.filter(o => o.status === 0).length;
    this.approvedOrders = orders.filter(o => o.status === 1).length;
    this.deliveredOrders = orders.filter(o => o.status === 5).length;
    this.totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    this.weeklyOrders = orders.length;
  }

  private loadRecentOrders() {
    this.recentOrders = this.orderAdmin.orders()
      .slice(0, 5)
      .map(o => ({
        ...o,
        statusLabel: this.orderAdmin.statuses[o.status],
        statusClass: this.getStatusClass(o.status)
      }));
  }

  private setQuickActions() {
    this.quickActions = [
      {
        icon: 'add_circle',
        label: 'Create Daily Order',
        link: '/shop-portal/create-order',
        color: 'from-emerald-500 to-green-600',
        description: 'Place a new daily order'
      },
      {
        icon: 'history',
        label: 'Order History',
        link: '/shop-portal/order-history',
        color: 'from-blue-500 to-indigo-600',
        description: 'View past orders'
      },
      {
        icon: 'track_changes',
        label: 'Track Orders',
        link: '/shop-portal/track-orders',
        color: 'from-amber-500 to-orange-600',
        description: 'Real-time order status'
      },
      {
        icon: 'print',
        label: 'Print Documents',
        link: '/shop-portal/print-documents',
        color: 'from-violet-500 to-purple-600',
        description: 'Delivery & invoices'
      }
    ];

    // Branch manager gets extra actions
    if (this.userRole === 'branch_manager') {
      this.quickActions.push(
        {
          icon: 'tune',
          label: 'Manage Orders',
          link: '/orders/manage',
          color: 'from-teal-500 to-cyan-600',
          description: 'Review and manage orders'
        },
        {
          icon: 'monitoring',
          label: 'Shop Monitor',
          link: '/shop-management/list',
          color: 'from-rose-500 to-pink-600',
          description: 'Monitor branch shops'
        }
      );
    }
  }

  private loadActivityFeed() {
    this.activityFeed = [
      { icon: 'add_circle', text: 'New order ORD-1001 created', time: '5 min ago', color: 'text-green-600' },
      { icon: 'verified', text: 'Order ORD-1002 approved by admin', time: '12 min ago', color: 'text-blue-600' },
      { icon: 'local_shipping', text: 'Order ORD-1004 out for delivery', time: '25 min ago', color: 'text-orange-600' },
      { icon: 'check_circle', text: 'Order ORD-1006 delivered successfully', time: '1 hour ago', color: 'text-emerald-600' },
      { icon: 'inventory_2', text: 'Stock alert: Alphonso Mangoes running low', time: '2 hours ago', color: 'text-amber-600' },
      { icon: 'schedule', text: 'Delivery slot 5AM-7AM fully booked', time: '3 hours ago', color: 'text-violet-600' }
    ];
  }

  getStatusClass(status: number): string {
    const map: { [key: number]: string } = {
      0: 'bg-amber-100 text-amber-700',
      1: 'bg-blue-100 text-blue-700',
      2: 'bg-indigo-100 text-indigo-700',
      3: 'bg-purple-100 text-purple-700',
      4: 'bg-orange-100 text-orange-700',
      5: 'bg-emerald-100 text-emerald-700'
    };
    return map[status] || '';
  }

  getOrderTypeClass(type: string): string {
    return type === 'bulk'
      ? 'bg-violet-100 text-violet-700'
      : 'bg-teal-100 text-teal-700';
  }
}
