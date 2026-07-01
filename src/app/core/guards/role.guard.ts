import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RbacService } from '../services/rbac.service';

export const roleGuard: CanActivateFn = (route) => {
  const rbac = inject(RbacService);
  const allowed = route.data['roles'] as string[];
  return allowed.includes(rbac.user()?.role ?? '');
};
