import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderAdminService, Order } from '../../orders/services/order-admin.service';

@Component({
  selector: 'app-shop-track-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './track-orders.component.html',
  styleUrls: ['./track-orders.component.css']
})
export class ShopTrackOrdersComponent implements OnInit {
  admin = inject(OrderAdminService);
  
  activeOrders: Order[] = [];
  selectedOrder: Order | null = null;
  
  stepperSteps = [
    { label: 'Placed', icon: 'receipt_long' },
    { label: 'Approved', icon: 'verified' },
    { label: 'Received', icon: 'storefront' },
    { label: 'Ready', icon: 'inventory_2' },
    { label: 'Out for Delivery', icon: 'local_shipping' },
    { label: 'Delivered', icon: 'check_circle' }
  ];

  ngOnInit() {
    this.loadActiveOrders();
  }

  loadActiveOrders() {
    // Get orders that are not yet completed (status < 6)
    this.activeOrders = this.admin.orders().filter(o => o.status < 6);
    
    // Select the first one by default if exists
    if (this.activeOrders.length > 0) {
      this.selectedOrder = this.activeOrders[0];
    }
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
  }
  
  getStepperCurrentStep(status: number): number {
    if (status >= 5) return 5;
    return status;
  }

  getStatusClass(status: number): string {
    const colors = this.admin.statusColors[status];
    return colors ? `${colors.bg} ${colors.text} ${colors.border}` : '';
  }

  getStatusLabel(status: number): string {
    return this.admin.statuses[status] || 'Unknown';
  }
}
