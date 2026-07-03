import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderAdminService } from '../services/order-admin.service';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.css'
})
export class ApproveComponent {
  admin = inject(OrderAdminService);
  
  expandedOrderId: string | null = null;

  get pendingOrders() {
    return this.admin.orders().filter(o => o.status === 0);
  }

  get approvedOrders() {
    return this.admin.orders().filter(o => o.status === 1);
  }

  approve(orderId: string) {
    this.admin.updateOrderStatus(orderId, 1);
  }

  reject(orderId: string) {
    // In real app, would set a 'rejected' status
    this.admin.updateOrderStatus(orderId, -1);
  }

  getStatusClass(status: number): string {
    const colors = this.admin.statusColors[status];
    return colors ? `${colors.bg} ${colors.text} ${colors.border}` : '';
  }

  toggleExpand(orderId: string) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }
}
