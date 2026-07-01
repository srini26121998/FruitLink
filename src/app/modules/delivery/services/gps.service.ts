import { Injectable, signal } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GpsService {

  // Starting point
  currentLocation = signal([12.9716, 77.5946]);

  constructor() {
    // Simulate GPS location update every 4 seconds
    let index = 0;
    const path = [
      [12.9716, 77.5946],
      [12.9723, 77.5992],
      [12.9735, 77.6049],
      [12.9750, 77.6094],
      [12.9780, 77.6140],
      [12.9810, 77.6195],
    ];

    interval(4000).subscribe(() => {
      index = (index + 1) % path.length;
      this.currentLocation.set(path[index]);
    });
  }
}
