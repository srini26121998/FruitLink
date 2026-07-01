import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-photo.component.html'
})
export class ChangePhotoComponent {

  @Output() photoChanged = new EventEmitter<File>();

  previewUrl: string | ArrayBuffer | null = null;

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);

    this.photoChanged.emit(file);
  }

  triggerFileInput(input: HTMLInputElement) {
    input.click();
  }
}
