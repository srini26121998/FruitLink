import { DriverAvailability } from './driver-availability.enum';

export interface DriverStatus {
  driverId: string;
  status: DriverAvailability;

  updatedAt: string;
}
