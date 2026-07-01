import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ForecastService {

  forecastData = signal<any[]>([]);

  generateForecast() {
    this.forecastData.set([
      { item: 'Apple', expected: 140, trend: 'up' },
      { item: 'Banana', expected: 95, trend: 'stable' },
      { item: 'Tomato', expected: 180, trend: 'up' }
    ]);
  }
}
