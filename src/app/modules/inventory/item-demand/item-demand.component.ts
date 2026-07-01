import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-demand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-demand.component.html'
})
export class ItemDemandComponent {
  history = [10, 12, 14, 13, 16, 18, 15];
}
