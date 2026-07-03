import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderAdminService, Order } from '../../orders/services/order-admin.service';

@Component({
  selector: 'app-shop-print-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './print-documents.component.html',
  styleUrls: ['./print-documents.component.css']
})
export class ShopPrintDocumentsComponent implements OnInit {
  admin = inject(OrderAdminService);
  
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  
  documentType: 'invoice' | 'delivery_challan' | 'receipt' = 'invoice';

  searchTerm = '';

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // Usually would load orders for the current shop manager
    this.orders = this.admin.orders();
    if (this.orders.length > 0) {
      this.selectedOrder = this.orders[0];
    }
  }

  get filteredOrders(): Order[] {
    if (!this.searchTerm) return this.orders;
    const term = this.searchTerm.toLowerCase();
    return this.orders.filter(o => 
      o.id.toLowerCase().includes(term) || 
      o.date.includes(term)
    );
  }

  selectOrder(order: Order) {
    this.selectedOrder = order;
  }

  printDocument() {
    window.print();
  }
}
