import { DriverAvailability } from '../../driver-status/models/driver-availability.enum';

export interface Driver {
  driverId: string;
  fullName: string;
  phoneNumber: string;

  city: string;

  availabilityStatus: DriverAvailability;

  activeOrderId?: string;
  vehicleId?: string;

  lastKnownLatitude?: number;
  lastKnownLongitude?: number;

  createdAt: string;
}
