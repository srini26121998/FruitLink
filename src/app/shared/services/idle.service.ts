import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BehaviorSubject, fromEvent, merge, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IdleService {

  private timeoutMinutes = 15; // AUTO LOGOUT AFTER 15 min
  private warningBefore = 30;  // 30 sec before logout show warning

  private warning$ = new BehaviorSubject<boolean>(false);
  warningState$ = this.warning$.asObservable();

  private router = inject(Router);
  private auth = inject(AuthService);

  constructor() {
    this.startWatching();
  }

  private startWatching() {
    const activityEvents = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'click'),
      fromEvent(document, 'scroll')
    );

    activityEvents.pipe(
      switchMap(() => {
        this.warning$.next(false);
        return timer((this.timeoutMinutes * 60 - this.warningBefore) * 1000);
      })
    ).subscribe(() => {
      // show warning
      this.warning$.next(true);

      timer(this.warningBefore * 1000).subscribe(() => {
        this.warning$.next(false);
        this.auth.logout();
        this.router.navigate(['/auth/login']);
      });
    });
  }
}
