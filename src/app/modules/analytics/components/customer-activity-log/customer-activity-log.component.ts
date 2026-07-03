import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDrilldownService } from '../../drilldown/customer/customer-drilldown.service';

@Component({
  selector: 'app-customer-activity-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-activity-log.component.html',
  styleUrls: ['./customer-activity-log.component.css']
})
export class CustomerActivityLogComponent {

  private svc = inject(CustomerDrilldownService);
  logs: any[] = [];
}
