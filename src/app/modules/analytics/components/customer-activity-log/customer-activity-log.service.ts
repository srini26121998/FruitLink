import { Injectable, signal } from '@angular/core';
import { CustomerActivity } from './customer-activity-log.model';

@Injectable({ providedIn: 'root' })
export class CustomerActivityLogService {

  recent = signal<CustomerActivity[]>([
    {
      id: '1',
      customer: 'Arun',
      event: 'Order Placed',
      timestamp: '2025-01-14T09:24:00',
      icon: 'shopping-cart',
      color: 'text-green-600'
    },
    {
      id: '2',
      customer: 'Priya',
      event: 'Payment Failed',
      timestamp: '2025-01-14T10:10:00',
      icon: 'credit-card',
      color: 'text-red-600'
    },
    {
      id: '3',
      customer: 'Kumar',
      event: 'Order Cancelled',
      timestamp: '2025-01-14T11:32:00',
      icon: 'x-circle',
      color: 'text-gray-500'
    },
    {
      id: '4',
      customer: 'Rahul',
      event: 'Review Submitted',
      timestamp: '2025-01-14T12:05:00',
      icon: 'star',
      color: 'text-yellow-500'
    }
  ]);
}
