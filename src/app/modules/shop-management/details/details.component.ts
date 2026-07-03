import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopManagementService, Shop } from '../services/shop-management.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  shop: Shop | null = null;
  loading: boolean = true;
  
  activeTab: 'overview' | 'orders' | 'credit' | 'visits' = 'overview';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopManagementService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchShopDetails(id);
      }
    });
  }

  fetchShopDetails(id: string): void {
    this.loading = true;
    this.shopService.getShopById(id).subscribe(data => {
      this.shop = data || null;
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/shop-management/list']);
  }

  setTab(tab: 'overview' | 'orders' | 'credit' | 'visits'): void {
    this.activeTab = tab;
  }

  editShop(): void {
    if (this.shop) {
      this.router.navigate(['/shop-management/edit', this.shop.id]);
    }
  }
}
