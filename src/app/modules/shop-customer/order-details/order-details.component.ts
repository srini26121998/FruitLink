import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {

  private shopService = inject<ShopService>(ShopService);
  private route = inject(ActivatedRoute);

  orderId!: number;
  order: any = null;

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.shopService.getOrderDetails(this.orderId).subscribe((res: any) => {
      this.order = res;
    });
  }
}
