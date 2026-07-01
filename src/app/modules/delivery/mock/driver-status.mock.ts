import { DriverAvailability } from '../driver-status/models/driver-availability.enum';
import { DriverStatus } from '../driver-status/models/driver-status.model';

export class DriverStatusMock {
  private static status: DriverStatus = {
    driverId: 'DRV001',
    status: DriverAvailability.AVAILABLE,
    updatedAt: new Date().toISOString()
  };

  static getStatus(): DriverStatus {
    return this.status;
  }

  static updateStatus(status: DriverAvailability): DriverStatus {
    this.status = {
      ...this.status,
      status,
      updatedAt: new Date().toISOString()
    };
    return this.status;
  }
}
