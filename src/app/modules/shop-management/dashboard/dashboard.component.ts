import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShopManagementService } from '../services/shop-management.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = null;
  loading: boolean = true;

  constructor(
    private shopService: ShopManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shopService.getDashboardStats().subscribe(data => {
      this.stats = data;
      this.loading = false;
    });
  }

  navigateToShopList(): void {
    this.router.navigate(['/shop-management/list']);
  }

  viewShop(id: string): void {
    this.router.navigate(['/shop-management/details', id]);
  }
}
