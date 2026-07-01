import { Component, inject, OnInit, computed } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RbacService } from '../../../core/services/rbac.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-permission-matrix',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './permission-matrix.component.html',
  styleUrls: ['./permission-matrix.component.css']
})
export class PermissionMatrixComponent implements OnInit {

  rbac = inject(RbacService);
  route = inject(ActivatedRoute);

  roleId = '';
  role: any;

  ngOnInit() {
    this.roleId = this.route.snapshot.paramMap.get('id')!;
    this.role = this.getRoleById(this.roleId);
  }

  permissionGroups = [
    {
      name: 'Dashboard & Analytics',
      icon: 'dashboard',
      permissions: [
        { id: 'dashboard.view', label: 'View Dashboard' },
        { id: 'analytics.admin', label: 'Admin Analytics' },
        { id: 'analytics.inventory', label: 'Inventory Analytics' },
        { id: 'analytics.shop', label: 'Shop Analytics' }
      ]
    },
    {
      name: 'Orders',
      icon: 'receipt_long',
      permissions: [
        { id: 'orders.view', label: 'View Orders' },
        { id: 'orders.create', label: 'Create Orders' },
        { id: 'orders.approve', label: 'Approve Orders' },
        { id: 'orders.details.view', label: 'View Details' },
        { id: 'orders.delivery.update', label: 'Update Delivery' }
      ]
    },
    {
      name: 'Fruits & Inventory',
      icon: 'inventory_2',
      permissions: [
        { id: 'fruits.view', label: 'View Fruits' },
        { id: 'fruits.add', label: 'Add Fruits' },
        { id: 'fruits.edit', label: 'Edit Fruits' },
        { id: 'fruits.delete', label: 'Delete Fruits' }
      ]
    },
    {
      name: 'Delivery',
      icon: 'local_shipping',
      permissions: [
        { id: 'delivery.view', label: 'View Deliveries' },
        { id: 'delivery.gps', label: 'GPS Tracking' },
        { id: 'delivery.routeopt', label: 'Route Optimization' }
      ]
    },
    {
      name: 'Shop Management',
      icon: 'storefront',
      permissions: [
        { id: 'shop.view', label: 'View Shops' },
        { id: 'shop.fruits', label: 'Shop Fruits' },
        { id: 'shop.orders', label: 'Shop Orders' },
        { id: 'shop.payments', label: 'Shop Payments' },
        { id: 'shop.support', label: 'Shop Support' }
      ]
    },
    {
      name: 'Payments',
      icon: 'payments',
      permissions: [
        { id: 'payments.view', label: 'View Payments' },
        { id: 'payments.details.view', label: 'Payment Details' },
        { id: 'payments.checkout', label: 'Checkout' },
        { id: 'payments.history.view', label: 'Payment History' }
      ]
    },
    {
      name: 'Reports',
      icon: 'bar_chart',
      permissions: [
        { id: 'reports.weekly', label: 'Weekly Reports' },
        { id: 'reports.monthly', label: 'Monthly Reports' },
        { id: 'reports.yearly', label: 'Yearly Reports' },
        { id: 'reports.topfruits', label: 'Top Fruits' },
        { id: 'reports.pendingpayments', label: 'Pending Payments' },
        { id: 'reports.shopfrequency', label: 'Shop Frequency' }
      ]
    },
    {
      name: 'Helpdesk',
      icon: 'support_agent',
      permissions: [
        { id: 'helpdesk.view', label: 'View Tickets' },
        { id: 'helpdesk.details.view', label: 'Ticket Details' },
        { id: 'helpdesk.faq', label: 'Manage FAQ' }
      ]
    },
    {
      name: 'Master Data',
      icon: 'database',
      permissions: [
        { id: 'master.cities.view', label: 'View Cities' },
        { id: 'master.cities.manage', label: 'Manage Cities' },
        { id: 'master.shoptypes.view', label: 'View Shop Types' },
        { id: 'master.shoptypes.manage', label: 'Manage Shop Types' },
        { id: 'master.fruitcategories.view', label: 'View Categories' },
        { id: 'master.fruitcategories.manage', label: 'Manage Categories' }
      ]
    },
    {
      name: 'Role Management (RBAC)',
      icon: 'security',
      permissions: [
        { id: 'rbac.roles.view', label: 'View Roles' },
        { id: 'rbac.roles.create', label: 'Create Roles' },
        { id: 'rbac.roles.edit', label: 'Edit Roles' },
        { id: 'rbac.roles.delete', label: 'Delete Roles' },
        { id: 'rbac.matrix.view', label: 'View Matrix' },
        { id: 'rbac.matrix.edit', label: 'Edit Matrix' },
        { id: 'rbac.manage', label: 'Manage RBAC' }
      ]
    },
    {
      name: 'Audit & Settings',
      icon: 'settings',
      permissions: [
        { id: 'audit.view', label: 'View Audit Logs' },
        { id: 'profile.view', label: 'View Profile' },
        { id: 'profile.update', label: 'Update Profile' },
        { id: 'settings.view', label: 'View Settings' },
        { id: 'settings.update', label: 'Update Settings' }
      ]
    }
  ];

  /** ✔ Local function because RbacService did not provide it */
  getRoleById(id: string) {
    return this.rbac.roles().find(r => r.id === id);
  }

  /** ✔ HTML passes only permId, so this signature is correct */
  isChecked(permId: string): boolean {
    if (this.role?.permissions.includes('*')) {
      return true;
    }
    return this.role?.permissions.includes(permId);
  }

  /** ✔ Toggle permission and refresh role */
  toggle(permId: string) {
    this.rbac.togglePermission(this.roleId, permId);
    this.role = this.getRoleById(this.roleId);
  }
}
