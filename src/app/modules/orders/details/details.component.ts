import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderAdminService } from '../services/order-admin.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html'
})
export class OrderDetailsComponent {
  private route = inject(ActivatedRoute);
  private admin = inject(OrderAdminService);
  private router = inject(Router);

  orderId = this.route.snapshot.paramMap.get('id')!;
  order = this.admin.getOrderById(this.orderId);
  logs = this.admin.getOrderLogs(this.orderId);
  statuses = this.admin.statuses;

  // --------- SAFE TOTAL CALCULATIONS (NO HTML reduce) ----------

  get hasItems(): boolean {
    return !!this.order && Array.isArray(this.order.items) && this.order.items.length > 0;
  }

  get subtotal(): number {
    if (!this.hasItems) return 0;
    return this.order.items.reduce((total: number, item: any) => {
      return total + (item.lineTotal ?? 0);
    }, 0);
  }

  get gst(): number {
    return this.subtotal * 0.05;
  }

  get discount(): number {
    return this.order?.discount ?? 0;
  }

  get payable(): number {
    return this.subtotal + this.gst - this.discount;
  }

  get orderTypeLabel(): string {
    return this.order?.orderType === 'bulk' ? 'Bulk Order' : 'Daily Order';
  }

  get orderTypeBadgeClass(): string {
    return this.order?.orderType === 'bulk'
      ? 'bg-violet-50 text-violet-700 border-violet-200'
      : 'bg-teal-50 text-teal-700 border-teal-200';
  }

  getStatusClass(status: number): string {
    const colors = this.admin.statusColors[status];
    return colors ? `${colors.bg} ${colors.text} ${colors.border}` : '';
  }

  // ------------------------------------------------------------

  advance() {
    if (!this.order) return;
    if (this.order.status < 6) {
      this.admin.updateOrderStatus(this.order.id, this.order.status + 1);
      this.order = this.admin.getOrderById(this.orderId);

      this.logs.push({
        text: this.statuses[this.order.status],
        by: 'Admin',
        time: new Date().toLocaleString()
      });
    }
  }

  changeStatus(event: any) {
    if (!this.order) return;
    const newStatus = parseInt(event.target.value, 10);
    this.admin.updateOrderStatus(this.order.id, newStatus);
    this.order = this.admin.getOrderById(this.orderId);

    this.logs.push({
      text: 'Status manually updated to ' + this.statuses[newStatus],
      by: 'Admin',
      time: new Date().toLocaleString()
    });
  }

  reorder() {
    if (!this.order) return;
    this.admin.reorderOrder(this.order.id, this.router);
  }

  duplicate() {
    if (!this.order) return;
    this.admin.duplicateOrder(this.order.id, this.router);
  }
}
