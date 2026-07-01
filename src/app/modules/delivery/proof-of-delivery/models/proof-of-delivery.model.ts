export interface ProofOfDelivery {
  orderId: string;
  driverId: string;

  photoUrl: string;

  latitude?: number;
  longitude?: number;

  deliveredAt: string;
}
