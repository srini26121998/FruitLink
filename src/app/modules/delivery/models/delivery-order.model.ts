import { DeliveryStatus } from './delivery-status.enum';

export interface DeliveryOrder {
  orderId: string;
  orderNumber: string;

  shopId: string;
  shopName: string;
  shopAddress: string;
  shopContactNumber: string;

  driverId?: string;
  vehicleId?: string;

  status: DeliveryStatus;

  expectedDeliveryAt: string; // ISO date
  dispatchedAt?: string;
  deliveredAt?: string;

  totalItems: number;
  totalWeightKg?: number;

  paymentMode: 'COD' | 'CREDIT' | 'ONLINE';
  amountToCollect?: number;

  routeId?: string;
  city: string;

  createdAt: string;
  updatedAt: string;
}
