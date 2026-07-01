import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface RoutePlan {
  totalDistanceKm: number;
  estimatedTimeMinutes: number;
  points: RoutePoint[];
}

@Injectable({ providedIn: 'root' })
export class RouteOptimizerService {

  /**
   * Basic mock route optimization
   * (API-ready, replace logic later)
   */
  optimizeRoute(
    locations: RoutePoint[]
  ): Observable<RoutePlan> {

    if (!locations || locations.length === 0) {
      return of({
        totalDistanceKm: 0,
        estimatedTimeMinutes: 0,
        points: []
      }).pipe(delay(200));
    }

    // 👇 Explicit typing fixes "never" issue
    const points: RoutePoint[] = locations.map(
      (loc: RoutePoint) => ({
        latitude: loc.latitude,
        longitude: loc.longitude
      })
    );

    // mock distance + time calculation
    const totalDistanceKm = points.length * 2.5;
    const estimatedTimeMinutes = points.length * 12;

    return of({
      totalDistanceKm,
      estimatedTimeMinutes,
      points
    }).pipe(delay(400));
  }
}
