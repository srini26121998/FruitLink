import { ProofOfDelivery } from '../proof-of-delivery/models/proof-of-delivery.model';

export class ProofOfDeliveryMock {

  private static proofs: ProofOfDelivery[] = [];

  static save(proof: ProofOfDelivery): ProofOfDelivery {
    this.proofs.push(proof);
    return proof;
  }

  static getByOrder(orderId: string): ProofOfDelivery | null {
    return this.proofs.find(p => p.orderId === orderId) ?? null;
  }
}
