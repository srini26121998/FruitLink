import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-payments-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-history.component.html'
})
export class PaymentsHistoryComponent implements OnInit {

  private shopService = inject<ShopService>(ShopService);
  payments: any[] = [];

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.shopService.getPaymentHistory().subscribe((res: any[]) => {
      this.payments = res;
    });
  }
}
