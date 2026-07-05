import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  activeTab: 'weekly' | 'monthly' | 'yearly' = 'weekly';

  setTab(tab: 'weekly' | 'monthly' | 'yearly') {
    this.activeTab = tab;
  }
}
