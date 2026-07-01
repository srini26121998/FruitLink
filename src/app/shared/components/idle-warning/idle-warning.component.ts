import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleService } from '../../services/idle.service';
import { Subscription, interval } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-idle-warning',
  imports: [CommonModule],
  templateUrl: './idle-warning.component.html'
})
export class IdleWarningComponent implements OnInit {

  showWarning = false;
  counter = 30;
  sub?: Subscription;

  constructor(private idle: IdleService) {}

  ngOnInit() {
    this.idle.warningState$.subscribe(show => {
      this.showWarning = show;

      if (show) {
        this.counter = 30;
        this.sub = interval(1000).subscribe(() => {
          this.counter--;
        });
      } else {
        this.sub?.unsubscribe();
      }
    });
  }

  stayLoggedIn() {
    window.dispatchEvent(new Event('mousemove')); 
  }
}
