export interface GpsLocation {
  driverId: string;
  latitude: number;
  longitude: number;

  accuracyMeters?: number;
  speedKmph?: number;

  recordedAt: string;
}
