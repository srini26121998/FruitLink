import { Component, signal } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

interface DriverLocation {
  driver: string;
  status: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-gps-tracking',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe, NgClass, RouterLink],
  templateUrl: './gps-tracking.component.html',
  styleUrls: ['./gps-tracking.component.css']
})
export class GpsTrackingComponent {

  // Driver Real-time locations (mock for now)
  locations = signal<DriverLocation[]>([
    { driver: 'Ramesh', status: 'On Delivery', lat: 12.9716, lng: 77.5946 },
    { driver: 'Suresh', status: 'Idle', lat: 13.0827, lng: 80.2707 },
    { driver: 'Kumar', status: 'Delivering', lat: 11.0168, lng: 76.9558 }
  ]);

  selectedDriver = signal<DriverLocation | null>(null);

  selectDriver(driver: DriverLocation) {
    this.selectedDriver.set(driver);
  }
}
