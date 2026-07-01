import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryException } from '../models/delivery-exception.model';
import { DeliveryExceptionService } from '../services/delivery-exception.service';

@Component({
  standalone: true,
  selector: 'app-delivery-exception-list',
  imports: [CommonModule],
  templateUrl: './delivery-exception-list.component.html'
})
export class DeliveryExceptionListComponent implements OnInit {

  exceptions = signal<DeliveryException[]>([]);
  loading = signal(true);

  constructor(
    private exceptionService: DeliveryExceptionService
  ) {}

  ngOnInit(): void {
    this.exceptionService.getExceptions().subscribe({
      next: (data: DeliveryException[]) => {
        this.exceptions.set(data);
        this.loading.set(false);
      }
    });
  }
}
