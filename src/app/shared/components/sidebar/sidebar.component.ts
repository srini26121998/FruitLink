import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebar = inject(SidebarService);
  auth = inject(AuthService);
  router = inject(Router);
  menu = signal<any[]>([]);
  open = signal<Record<string, boolean>>({});

  ngOnInit() {
    this.menu.set(this.sidebar.getMenu());
    this.autoOpen(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.autoOpen(e.urlAfterRedirects);
        if (this.sidebar.isMobile()) this.sidebar.collapsed.set(true);
      });
  }

  toggleGroup(id: string) {
    const m = { ...this.open() };
    m[id] = !m[id];
    this.open.set(m);
  }

  handleItemClick(item: any) {
    if (this.sidebar.collapsed()) {
      this.sidebar.collapsed.set(false);
      if (item.children && item.id) {
        const m = { ...this.open() };
        m[item.id] = true;
        this.open.set(m);
      }
    } else {
      if (item.children && item.id) {
        this.toggleGroup(item.id);
      }
    }

    if (item.link && !item.children) {
      this.router.navigate([item.link]);
    }
  }

  autoOpen(url: string) {
    const map: Record<string, boolean> = {};
    for (const item of this.menu()) {
      if (item.children?.some((c: { link: string; }) => c.link === url)) {
        map[item.id] = true;
      }
    }
    this.open.set(map);
  }

  isActive(link?: string): boolean {
    if (!link) return false;
    return this.router.isActive(link, { paths: 'exact', matrixParams: 'ignored', queryParams: 'ignored', fragment: 'ignored' });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
