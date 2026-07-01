import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() actionLabel?: string;
  @Input() actionIcon?: string = '➕';
  @Input() actionCallback?: () => void;

    addNewItem() {
    console.log("Clicked add new");
  }
}
