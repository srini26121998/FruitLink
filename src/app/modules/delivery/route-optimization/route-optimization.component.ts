import { Component, signal } from '@angular/core';
import { NgForOf, NgIf, NgClass, DecimalPipe } from '@angular/common';

interface DeliveryPoint {
  shop: string;
  lat: number;
  lng: number;
  distance?: string;
  time?: string;
}

@Component({
  selector: 'app-route-optimization',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, DecimalPipe],
  templateUrl: './route-optimization.component.html',
  styleUrls: ['./route-optimization.component.css']
})
export class RouteOptimizationComponent {

  points = signal<DeliveryPoint[]>([
    { shop: 'Juice Shop A', lat: 12.9716, lng: 77.5946 },
    { shop: 'Juice Shop B', lat: 13.0827, lng: 80.2707 },
    { shop: 'Juice Shop C', lat: 11.0168, lng: 76.9558 },
    { shop: 'Juice Shop D', lat: 12.2133, lng: 79.1124 },
    { shop: 'Juice Shop E', lat: 11.6643, lng: 78.1460 },
  ]);

  optimizedRoute = signal<DeliveryPoint[] | null>(null);
  isOptimizing = signal<boolean>(false);

  optimizeRoute() {
    this.isOptimizing.set(true);
    this.optimizedRoute.set(null);
    
    // Simulate API call and optimization calculation
    setTimeout(() => {
      // Mock route optimization (sort by lat)
      const sorted = [...this.points()]
        .sort((a, b) => a.lat - b.lat)
        .map((point, index) => ({
          ...point,
          distance: index === 0 ? '0 km' : `${(Math.random() * 10 + 2).toFixed(1)} km`,
          time: index === 0 ? 'Start' : `${Math.floor(Math.random() * 20 + 10)} mins`
        }));
        
      this.optimizedRoute.set(sorted);
      this.isOptimizing.set(false);
    }, 1500);
  }
}
