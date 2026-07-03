import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderAdminService } from '../services/order-admin.service';

@Component({
  selector: 'app-delivery-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './delivery-update.component.html',
  styleUrl: './delivery-update.component.css'
})
export class DeliveryUpdateComponent {
  admin = inject(OrderAdminService);

  selectedOrderId: string = '';
  deliveryStatus: string = 'Order Received';
  deliveryNote: string = '';

  activeModal: 'none' | 'delivery' | 'shop' | 'sign' | 'billing' = 'none';
  signaturePad: boolean = false;

  // Delivery Completion Process Steps
  completion = {
    deliveryPrint: false,
    shopPrint: false,
    verified: false,
    signed: false,
    billing: false
  };

  get inTransitOrders() {
    return this.admin.orders().filter(o => o.status >= 1 && o.status <= 5);
  }

  get selectedOrder(): any | null {
    return this.selectedOrderId ? this.admin.getOrderById(this.selectedOrderId) : null;
  }

  get isCompletionReady(): boolean {
    return this.completion.deliveryPrint &&
           this.completion.shopPrint &&
           this.completion.verified &&
           this.completion.signed &&
           this.completion.billing;
  }

  onOrderSelect() {
    const order = this.selectedOrder;
    if (order) {
      if (order.status === 1) {
        this.deliveryStatus = 'Order Received';
      } else if (order.status >= 2 && order.status <= 6) {
        this.deliveryStatus = this.admin.statuses[order.status];
      }
      this.resetCompletion();
    }
  }

  resetCompletion() {
    this.completion = {
      deliveryPrint: false,
      shopPrint: false,
      verified: false,
      signed: false,
      billing: false
    };
  }

  updateDelivery() {
    if (!this.selectedOrderId) return;
    const statusMap: {[key: string]: number} = {
      'Order Received': 2,
      'Order Ready': 3,
      'Out for Delivery': 4,
      'Delivered': 5,
    };
    const newStatus = statusMap[this.deliveryStatus];
    if (newStatus !== undefined) {
      this.admin.updateOrderStatus(this.selectedOrderId, newStatus);
      
      if (newStatus === 5) {
        // Just transitioned to Delivered, keep selected to show completion checklist
        this.deliveryNote = '';
      } else {
        // Other statuses, clear selection
        this.selectedOrderId = '';
        this.deliveryNote = '';
        this.resetCompletion();
      }
    }
  }

  // Modal controls
  openModal(type: 'delivery' | 'shop' | 'sign' | 'billing') {
    this.activeModal = type;
    this.signaturePad = false;
  }

  closeModal() {
    this.activeModal = 'none';
    this.signaturePad = false;
  }

  printDocument() {
    window.print();
    setTimeout(() => {
      if (this.activeModal === 'delivery') this.completion.deliveryPrint = true;
      if (this.activeModal === 'shop') this.completion.shopPrint = true;
      if (this.activeModal === 'billing') this.completion.billing = true;
      this.closeModal();
    }, 500);
  }

  // Completion Actions
  generateDeliveryPrint() {
    this.openModal('delivery');
  }

  generateShopPrint() {
    this.openModal('shop');
  }

  verifyCopies() {
    this.completion.verified = !this.completion.verified;
  }

  signDocuments() {
    this.openModal('sign');
  }

  confirmSignature() {
    this.completion.signed = true;
    this.closeModal();
  }

  completeBilling() {
    this.openModal('billing');
  }

  completeOrderProcess() {
    if(this.isCompletionReady && this.selectedOrderId) {
      this.admin.updateOrderStatus(this.selectedOrderId, 6); // 6 is Completed
      this.selectedOrderId = '';
      this.deliveryNote = '';
      this.resetCompletion();
    }
  }
}
