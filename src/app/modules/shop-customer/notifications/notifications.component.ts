import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  private shopService = inject<ShopService>(ShopService);

  notifications: any[] = [];

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.shopService.getNotifications().subscribe((res: any[]) => {
      this.notifications = res;
    });
  }
}
