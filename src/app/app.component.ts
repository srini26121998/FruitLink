import { Component, inject, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarService } from './shared/services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sidebar = inject(SidebarService);

  @HostListener('window:resize')
  onResize() {
    this.sidebar.setMobile(window.innerWidth < 1024);
  }

  ngOnInit() {
    this.sidebar.setMobile(window.innerWidth < 1024);
  }
}
