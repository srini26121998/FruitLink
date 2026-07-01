import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DriversService {

  drivers = signal([
    { id: 'D1', name: 'Suresh', phone: '9876543210', load: 3, capacity: 10, location: [12.9716, 77.5946] },
    { id: 'D2', name: 'Ravi', phone: '9876501234', load: 1, capacity: 10, location: [12.9750, 77.6080] },
    { id: 'D3', name: 'Kumar', phone: '9876517890', load: 5, capacity: 10, location: [12.9820, 77.6200] },
    { id: 'D4', name: 'John', phone: '9876588888', load: 0, capacity: 10, location: [12.9733, 77.6010] },
  ]);

  increaseLoad(driverId: string) {
    const d = this.drivers().map(driver =>
      driver.id === driverId ? { ...driver, load: driver.load + 1 } : driver
    );
    this.drivers.set(d);
  }
}
