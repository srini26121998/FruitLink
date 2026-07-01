import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { RbacService } from '../../../core/services/rbac.service';

@Component({
  selector: 'app-permission-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './permission-editor.component.html',
})
export class PermissionEditorComponent {

  rbac = inject(RbacService);

  // ✅ Form controls (MUST MATCH TEMPLATE)
  id = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  label = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  resource = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  action = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  success = signal('');

  addPermission() {
    if (!this.id.value || !this.label.value || !this.resource.value || !this.action.value) {
      this.success.set('❌ All fields are required');
      return;
    }

    const newPermission = {
      id: this.id.value,
      label: this.label.value,
      resource: this.resource.value,
      action: this.action.value,
    };

    this.rbac.addPermission(newPermission);

    this.success.set('✔ Permission added successfully');

    // reset inputs
    this.id.reset();
    this.label.reset();
    this.resource.reset();
    this.action.reset();
  }
}
