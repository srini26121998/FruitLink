import { Driver } from '../exceptions/models/driver.model';
import { DriverAvailability } from '../driver-status/models/driver-availability.enum';

export class DriversMock {

  static getAvailableDrivers(): Driver[] {
    return [
      {
        driverId: 'DRV001',
        fullName: 'Kumar',
        phoneNumber: '9000011111',
        city: 'Chennai',
        availabilityStatus: DriverAvailability.AVAILABLE,
        createdAt: new Date().toISOString()
      },
      {
        driverId: 'DRV002',
        fullName: 'Ravi',
        phoneNumber: '9000022222',
        city: 'Chennai',
        availabilityStatus: DriverAvailability.AVAILABLE,
        createdAt: new Date().toISOString()
      }
    ];
  }
}
