import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<NotificationMessage | null>(null);
  notifications$ = this.notificationSubject.asObservable();

  private push(type: NotificationMessage['type'], message: string) {
    this.notificationSubject.next({ type, message });
  }

  success(message: string) {
    this.push('success', message);
  }

  error(message: string) {
    this.push('error', message);
  }

  info(message: string) {
    this.push('info', message);
  }

  warning(message: string) {
    this.push('warning', message);
  }
}
