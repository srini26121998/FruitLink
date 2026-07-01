import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!err.status) {
        notify.error('Network error. Please check your connection.');
        return throwError(() => err);
      }

      switch (err.status) {
        case 400:
          notify.error(err.error?.message || 'Bad Request.');
          break;

        case 401:
          notify.error('Session expired. Please login again.');
          auth.logout();
          router.navigate(['/auth/login']);
          break;

        case 403:
          notify.error('You do not have permission to perform this action.');
          break;

        case 404:
          notify.error('Requested resource not found.');
          break;

        case 422:
          if (err.error?.errors) {
            const messages = Object.values(err.error.errors).flat().join(' ');
            notify.error(messages);
          } else {
            notify.error(err.error?.message || 'Validation Error.');
          }
          break;

        case 500:
          notify.error('Server error. Please try again later.');
          break;

        default:
          notify.error(err.error?.message || 'Unexpected error occurred.');
          break;
      }

      return throwError(() => err);
    })
  );
};
