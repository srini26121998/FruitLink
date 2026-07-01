import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, Observable } from 'rxjs';

let isRefreshing = false;
let refreshPending: ((token: string) => void)[] = [];

export const refreshTokenInterceptor: HttpInterceptorFn =
  (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

    const auth = inject(AuthService);
    const notify = inject(NotificationService);
    const router = inject(Router);

    const token = auth.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status !== 401) {
          return throwError(() => error);
        }

        if (req.url.includes('/auth/refresh')) {
          auth.logout();
          router.navigate(['/auth/login']);
          return throwError(() => error);
        }

        if (isRefreshing) {
          // ✔ FIXED: specify correct Observable<HttpEvent<any>>
          return new Observable<HttpEvent<any>>((observer) => {
            refreshPending.push((newToken: string) => {
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` }
              });
              next(retryReq).subscribe({
                next: (res) => observer.next(res),
                error: (err) => observer.error(err),
                complete: () => observer.complete()
              });
            });
          });
        }

        isRefreshing = true;

        return auth.refreshToken().pipe(
          switchMap((res: any) => {
            isRefreshing = false;

            const newToken = res.accessToken;
            auth.setAccessToken(newToken);

            // Retry queued requests
            refreshPending.forEach(cb => cb(newToken));
            refreshPending = [];

            // Retry original request
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });

            return next(retryReq);
          }),
          catchError(err => {
            isRefreshing = false;

            notify.error("Session expired. Please login again.");
            auth.logout();
            router.navigate(['/auth/login']);

            return throwError(() => err);
          })
        );
      })
    );
  };
