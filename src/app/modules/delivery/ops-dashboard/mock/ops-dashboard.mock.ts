export interface OpsDashboardSnapshot {
  pendingDispatch: number;
  outForDelivery: number;
  deliveredToday: number;
  delayedDeliveries: number;
  activeDrivers: number;
  alerts: {
    id: string;
    message: string;
    severity: 'HIGH' | 'MEDIUM';
  }[];
}

export class OpsDashboardMock {

  static getSnapshot(): OpsDashboardSnapshot {
    return {
      pendingDispatch: 18,
      outForDelivery: 42,
      deliveredToday: 126,
      delayedDeliveries: 5,
      activeDrivers: 31,
      alerts: [
        {
          id: 'A1',
          message: '5 orders delayed beyond SLA',
          severity: 'HIGH'
        },
        {
          id: 'A2',
          message: 'Driver Kumar inactive for 30 mins',
          severity: 'MEDIUM'
        }
      ]
    };
  }
}
