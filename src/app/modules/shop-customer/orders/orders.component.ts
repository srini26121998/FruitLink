import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-shop-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  orders = [
    { id: 'ORD-1021', date: '2024-12-02', total: 1520, status: 'Delivered' },
    { id: 'ORD-1020', date: '2024-12-01', total: 980, status: 'Out for Delivery' },
  ];

}
