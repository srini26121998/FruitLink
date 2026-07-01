import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {

  constructor(private router: Router) {}

  @Input() actions: { label: string; icon?: string; route?: string; click?: () => void }[] = [];

  handleClick(action: any) {
    if (action.click) action.click();
    if (action.route) this.router.navigate([action.route]);
  }
}
