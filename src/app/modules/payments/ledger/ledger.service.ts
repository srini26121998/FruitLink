import { Injectable, signal } from '@angular/core';

export interface LedgerEntry {
  id: string;
  date: Date;
  amount: number;
  type: 'debit' | 'credit'; // debit = order; credit = payment received
  remarks?: string;
}

export interface CustomerLedger {
  shopId: string;
  name: string;
  creditLimit: number;
  outstanding: number;
  entries: LedgerEntry[];
}

@Injectable({ providedIn: 'root' })
export class LedgerService {

  // 🔹 Mock data – later load from API
  ledgers = signal<CustomerLedger[]>([
    { shopId: 'SHOP001', name: 'Sai Fruits',       creditLimit: 50000, outstanding: 12000, entries: [] },
    { shopId: 'SHOP002', name: 'Murugan Stores',   creditLimit: 40000, outstanding: 8000,  entries: [] },
    { shopId: 'SHOP003', name: 'Royal Mart',       creditLimit: 60000, outstanding: 22000, entries: [] },
    { shopId: 'SHOP004', name: 'Green Shop',       creditLimit: 30000, outstanding: 3000,  entries: [] },
  ]);

  getCustomer(shopId: string): CustomerLedger {
    const c = this.ledgers().find(c => c.shopId === shopId);
    if (!c) throw new Error(`Customer not found: ${shopId}`);
    return c;
  }

  // ✅ Alias used by settlement component
  addPayment(shopId: string, amount: number, remarks = 'Payment Received') {
    this.addCredit(shopId, amount, remarks);
  }

  // ✅ Used by detail/statement
  getShopLedger(shopId: string): LedgerEntry[] {
    return this.getCustomer(shopId).entries;
  }

  // ===== Business Mutations =====

  addDebit(shopId: string, amount: number, remarks = 'Order Purchase') {
    const c = this.getCustomer(shopId);
    c.outstanding += amount;
    c.entries.push({
      id: crypto.randomUUID(),
      date: new Date(),
      amount,
      type: 'debit',
      remarks,
    });
    this.ledgers.set([...this.ledgers()]);
  }

  addCredit(shopId: string, amount: number, remarks = 'Payment Settlement') {
    const c = this.getCustomer(shopId);
    c.outstanding -= amount;
    c.entries.push({
      id: crypto.randomUUID(),
      date: new Date(),
      amount,
      type: 'credit',
      remarks,
    });
    this.ledgers.set([...this.ledgers()]);
  }

  exceedsLimit(shopId: string, amount: number): boolean {
    const c = this.getCustomer(shopId);
    return c.outstanding + amount > c.creditLimit;
  }

  getOutstanding(shopId: string): number {
    return this.getCustomer(shopId).outstanding;
  }

  getMonthly(shopId: string, month: number): LedgerEntry[] {
    return this.getCustomer(shopId).entries.filter(
      e => new Date(e.date).getMonth() === month
    );
  }

  // ===== Aggregates for Dashboard =====

  // 🔹 All entries across all customers
  allEntries(): LedgerEntry[] {
    return this.ledgers().flatMap(c => c.entries);
  }

  // 🔹 Total debit (orders)
  totalDebitAmount(): number {
    return this.allEntries()
      .filter(e => e.type === 'debit')
      .reduce((sum, e) => sum + e.amount, 0);
  }

  // 🔹 Total credit (payments)
  totalCreditAmount(): number {
    return this.allEntries()
      .filter(e => e.type === 'credit')
      .reduce((sum, e) => sum + e.amount, 0);
  }

  // 🔹 Total outstanding across all customers
  totalOutstanding(): number {
    return this.ledgers().reduce((t, c) => t + c.outstanding, 0);
  }

  // 🔹 Per-shop outstanding for dashboard table
  outstandingByShop(): { shopId: string; name: string; outstanding: number }[] {
    return this.ledgers().map(c => ({
      shopId: c.shopId,
      name: c.name,
      outstanding: c.outstanding,
    }));
  }

  // 🔹 Credit recovery %
  recoveryRate(): number {
    const totalDebit = this.totalDebitAmount();
    const totalCredit = this.totalCreditAmount();
    return totalDebit ? Math.round((totalCredit / totalDebit) * 100) : 0;
  }
}
