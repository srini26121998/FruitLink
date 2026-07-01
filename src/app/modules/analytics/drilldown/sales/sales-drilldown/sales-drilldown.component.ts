import { Component, computed, signal } from '@angular/core';
import { SharedChartsModule } from '../../../../../shared/charts/shared-charts.module';

interface SalesKpis {
  totalOrders: number;
  totalRevenue: number;
  totalQuantityKg: number;
  avgOrderValue: number;
  avgItemsPerOrder: number;
  activeCustomers: number;
  repeatCustomerRate: number;
}

interface SalesRow {
  orderId: string;
  orderDate: string;
  city: string;
  customerName: string;
  productCount: number;
  quantityKg: number;
  orderValue: number;
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIAL';
  deliveryStatus: 'DELIVERED' | 'IN_TRANSIT' | 'CANCELLED';
}

@Component({
  selector: 'app-sales-drilldown',
  standalone: true,
  imports: [SharedChartsModule],
  templateUrl: './sales-drilldown.component.html',
  styleUrls: ['./sales-drilldown.component.css']
})
export class SalesDrilldownComponent {

  /* ================= KPI DATA ================= */

  private readonly _kpis = signal<SalesKpis>({
    totalOrders: 342,
    totalRevenue: 1845000,
    totalQuantityKg: 12650,
    avgOrderValue: 5395,
    avgItemsPerOrder: 6.2,
    activeCustomers: 118,
    repeatCustomerRate: 68
  });

  readonly kpis = computed(() => this._kpis());

  /* ================= TABLE DATA ================= */

  private readonly _rows = signal<SalesRow[]>([
    {
      orderId: 'ORD-1001',
      orderDate: '12 Feb 2025',
      city: 'Chennai',
      customerName: 'Sri Lakshmi Stores',
      productCount: 8,
      quantityKg: 320,
      orderValue: 18400,
      paymentStatus: 'PAID',
      deliveryStatus: 'DELIVERED'
    },
    {
      orderId: 'ORD-1002',
      orderDate: '12 Feb 2025',
      city: 'Chennai',
      customerName: 'Green Juice Hub',
      productCount: 5,
      quantityKg: 210,
      orderValue: 11950,
      paymentStatus: 'PARTIAL',
      deliveryStatus: 'IN_TRANSIT'
    },
    {
      orderId: 'ORD-1003',
      orderDate: '13 Feb 2025',
      city: 'Bangalore',
      customerName: 'Fresh Mart',
      productCount: 6,
      quantityKg: 275,
      orderValue: 15200,
      paymentStatus: 'PENDING',
      deliveryStatus: 'IN_TRANSIT'
    }
  ]);

  readonly rows = computed(() => this._rows());

  /* ================= FORMAT HELPERS ================= */

  formatCurrency(value: number): string {
    return '₹' + value.toLocaleString('en-IN');
  }

  formatNumber(value: number): string {
    return value.toLocaleString('en-IN');
  }

  /* ================= EXPORT (STUB) ================= */

  exportCSV() {
    console.log('Export Excel');
  }

  exportPDF() {
    console.log('Export PDF');
  }
}
