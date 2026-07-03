import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAdminService } from '../services/order-admin.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-manage',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './manage.component.html'
})
export class OrderManageComponent {
  admin = inject(OrderAdminService);
  statuses = this.admin.statuses;

  advance(order: any) {
    if (order.status < 6) {
      this.admin.updateOrderStatus(order.id, order.status + 1);
    }
  }

  getStatusClass(status: number): string {
    const colors = this.admin.statusColors[status];
    return colors ? `${colors.bg} ${colors.text} ${colors.border}` : '';
  }
}
