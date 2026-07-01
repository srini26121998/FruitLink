import { DeliveryException } from '../exceptions/models/delivery-exception.model';
import { DeliveryExceptionReason } from '../exceptions/models/delivery-exception-reason.enum';
export class DeliveryExceptionsMock {

  private static exceptions: DeliveryException[] = [
     {
    exceptionId: 'EXC001',
    orderId: 'ORD101',
    driverId: 'DRV01',
    reason: DeliveryExceptionReason.SHOP_CLOSED,
    notes: 'Shop shutter closed',
    reportedAt: new Date().toISOString(),
    resolved: false
  },
  {
    exceptionId: 'EXC002',
    orderId: 'ORD102',
    driverId: 'DRV02',
    reason: DeliveryExceptionReason.CUSTOMER_UNAVAILABLE,
    reportedAt: new Date().toISOString(),
    resolved: true
  }
  ];

  static getAll(): DeliveryException[] {
    return this.exceptions;
  }

  static report(exception: DeliveryException): DeliveryException {
    this.exceptions = [exception, ...this.exceptions];
    return exception;
  }
}
