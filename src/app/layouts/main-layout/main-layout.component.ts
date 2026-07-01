import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarService } from '../../shared/services/sidebar.service';
import { ToasterComponent } from "../../shared/components/toaster/toaster.component";
import { LoaderOverlayComponent } from "../../shared/components/loader-overlay/loader-overlay.component";
import { IdleWarningComponent } from "../../shared/components/idle-warning/idle-warning.component";

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, ToasterComponent, LoaderOverlayComponent, IdleWarningComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  sidebar = inject(SidebarService);
}
