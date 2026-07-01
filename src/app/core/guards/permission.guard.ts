import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RbacService } from '../services/rbac.service';

export const permissionGuard: CanActivateFn = (route) => {
  const rbac = inject(RbacService);
  const perm = route.data['permission'];
  return rbac.hasPermission(perm);
};
