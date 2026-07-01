import { Component, HostListener, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { NgIf } from '@angular/common';
import { CartService } from '../../../modules/shop-customer/services/cart.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 cart = inject(CartService);
  sidebar = inject(SidebarService);
  auth = inject(AuthService);
  router = inject(Router);

  showPanel = signal(false);
  showUserMenu = signal(false);

  // ⭐ FIXED: Typed getter prevents "unknown" error
  get user() {
    return this.auth.currentUser(); // returns UserProfile | null
  }

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.showPanel.update(v => !v);
  }

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.showUserMenu.update(v => !v);
  }

  toggleSidebarMobile(event: Event) {
    event.stopPropagation();
    this.sidebar.toggleSidebar();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
