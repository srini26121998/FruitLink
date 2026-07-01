import { Component } from '@angular/core';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.css'
})
export class ApproveComponent {
  approve() {
    alert('Order Approved Successfully!');
  }

  reject() {
    alert('Order Rejected!');
  }
}
