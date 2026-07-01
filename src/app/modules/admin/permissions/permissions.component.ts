import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';
import { RbacService } from '../../../core/services/rbac.service';
import { Role, Permission } from '../../../core/models/rbac.model';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {

  private auth = inject(AuthService);
  private rbac = inject(RbacService);

  roles: Role[] = [];
  permissions: Permission[] = [];
  rolePermissions: Record<string, string[]> = {};   
  selectedRole: string | null = null;

  ngOnInit() {
    this.roles = this.rbac.roles();
    this.permissions = this.rbac.permissions();
    this.rolePermissions = { ...this.rbac.rolePermissions() };
  }

  selectRole(roleId: string) {
    this.selectedRole = roleId;
  }

  isChecked(permId: string): boolean {
    if (!this.selectedRole) return false;
    return this.rolePermissions[this.selectedRole]?.includes(permId);
  }

  togglePermission(permId: string) {
    if (!this.selectedRole) return;

    // Update RBAC
    this.rbac.togglePermission(this.selectedRole, permId);

    // Refresh map
    this.rolePermissions = { ...this.rbac.rolePermissions() };

    // Update current user if same role
    const currentUser = this.auth.getUser();
    if (currentUser && currentUser.role === this.selectedRole) {
      this.auth.updateUser({
        permissions: this.rolePermissions[this.selectedRole]
      });
    }
    
  }
}
