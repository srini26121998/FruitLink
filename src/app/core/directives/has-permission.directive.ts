import { Directive, TemplateRef, ViewContainerRef, Input, inject } from '@angular/core';
import { RbacService } from '../services/rbac.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {

  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private rbac = inject(RbacService);

  @Input()
  set hasPermission(permission: string) {
    this.vcr.clear();
    if (this.rbac.hasPermission(permission)) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
