import { DeliveryOrder } from '../models/delivery-order.model';
import { DeliveryStatus } from '../models/delivery-status.enum';

export class DeliveryOrdersMock {

  static getDriverTodayOrders(): DeliveryOrder[] {
    return [
      {
        orderId: 'ORD001',
        orderNumber: 'FL-1001',
        shopId: 'SHP01',
        shopName: 'Raja Fruits',
        shopAddress: 'T Nagar',
        shopContactNumber: '9876543210',
        city: 'Chennai',

        status: DeliveryStatus.OUT_FOR_DELIVERY,

        totalItems: 12,
        paymentMode: 'CREDIT',

        expectedDeliveryAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        orderId: 'ORD002',
        orderNumber: 'FL-1002',
        shopId: 'SHP02',
        shopName: 'Green Mart',
        shopAddress: 'Velachery',
        shopContactNumber: '9876500000',
        city: 'Chennai',

        status: DeliveryStatus.DISPATCHED,

        totalItems: 8,
        paymentMode: 'COD',

        expectedDeliveryAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
   static getDispatchPendingOrders(): DeliveryOrder[] {
    return [
      {
        orderId: 'ORD101',
        orderNumber: 'FL-2001',
        shopId: 'SHP11',
        shopName: 'Fresh Fruits',
        shopAddress: 'Anna Nagar',
        shopContactNumber: '9876511111',
        city: 'Chennai',

        status: DeliveryStatus.PACKED,

        totalItems: 15,
        paymentMode: 'CREDIT',

        expectedDeliveryAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        orderId: 'ORD102',
        orderNumber: 'FL-2002',
        shopId: 'SHP12',
        shopName: 'Daily Mart',
        shopAddress: 'Guindy',
        shopContactNumber: '9876522222',
        city: 'Chennai',

        status: DeliveryStatus.APPROVED,

        totalItems: 9,
        paymentMode: 'COD',

        expectedDeliveryAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
}
