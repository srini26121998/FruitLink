import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { RbacService } from '../../../core/services/rbac.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-role.component.html'
})
export class CreateRoleComponent {

  rbac = inject(RbacService);
  router = inject(Router);

  roleName = new FormControl('', Validators.required);

  save() {
    if (!this.roleName.valid) return;
    this.rbac.addRole(this.roleName.value!);
    this.router.navigate(['/roles/role-list']);
  }

  goBack() {
    this.router.navigate(['/roles/role-list']);
  }
}
