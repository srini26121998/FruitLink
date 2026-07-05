import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ChangePasswordComponent } from '../../shared/components/change-password/change-password.component';
import { ChangePhotoComponent } from '../../shared/components/change-photo/change-photo.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PageHeaderComponent, ChangePasswordComponent, ChangePhotoComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  showPasswordModal = false;

  openChangePassword() {
    this.showPasswordModal = true;
  }

  closeChangePassword() {
    this.showPasswordModal = false;
  }

}
