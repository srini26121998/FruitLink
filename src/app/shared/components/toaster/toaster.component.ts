import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationMessage } from '../../services/notification.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit, OnDestroy {

  notifications: NotificationMessage[] = [];
  sub?: Subscription;

  constructor(private notify: NotificationService) {}

  ngOnInit(): void {
    this.sub = this.notify.notifications$.subscribe(notif => {
      if (notif) {
        this.notifications.push(notif);

        // Auto remove after 3 seconds
        timer(3000).subscribe(() => {
          this.notifications.shift();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
