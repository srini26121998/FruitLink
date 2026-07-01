import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAdminService } from '../services/order-admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-manage',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage.component.html'
})
export class OrderManageComponent {
  admin = inject(OrderAdminService);

  statuses = this.admin.statuses;

  advance(order: any) {
    if (order.status < 5) {
      this.admin.updateOrderStatus(order.id, order.status + 1);
    }
  }
}
