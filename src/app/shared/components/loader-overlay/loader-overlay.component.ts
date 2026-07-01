import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.css']
})
export class LoaderOverlayComponent implements OnInit {

  loading = false;

  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.loading$.subscribe(state => {
      this.loading = state;
    });
  }
}
