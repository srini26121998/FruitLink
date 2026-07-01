import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SharedChartsModule } from '../../../../shared/charts/shared-charts.module';
import {
  createChartConfig,
  createPieChartConfig
} from '../../../../shared/charts/chart.utils';

@Component({
  selector: 'app-city-dashboard',
  standalone: true,
  imports: [SharedChartsModule],
  templateUrl: './city-dashboard.component.html',
  styleUrls: ['./city-dashboard.component.css']
})
export class CityDashboardComponent {

  constructor(private router: Router) {}

 /* ---------------- FILTER ---------------- */
filter = signal<'month' | 'year'>('month');

/** 👇 FIX: strongly typed options */
filterOptions: Array<'month' | 'year'> = ['month', 'year'];

setFilter(f: 'month' | 'year') {
  this.filter.set(f);
}


  /* ---------------- DATA ---------------- */
  readonly rows = signal([
    {
      city: 'Chennai',
      orders: 320,
      customers: 48,
      quantityKg: 12400,
      revenue: 860000
    },
    {
      city: 'Bangalore',
      orders: 280,
      customers: 39,
      quantityKg: 9800,
      revenue: 720000
    }
  ]);

  /* ---------------- NAVIGATION (STEP 8 CORE) ---------------- */
  openSalesDrilldown(city: string) {
    this.router.navigate(
      ['/analytics/drilldown/sales'],
      {
        queryParams: {
          city,
          period: this.filter()
        }
      }
    );
  }

  /* ---------------- FORMATTERS ---------------- */
  formatNumber(v: number): string {
    return v.toLocaleString('en-IN');
  }

  formatCurrency(v: number): string {
    return '₹' + v.toLocaleString('en-IN');
  }

  /* ---------------- CHARTS ---------------- */
  readonly revenueChart = computed(() =>
    createChartConfig(
      'bar',
      300,
      this.rows().map(r => r.city),
      'Revenue',
      this.rows().map(r => r.revenue)
    )
  );

  readonly orderChart = computed(() =>
    createChartConfig(
      'bar',
      300,
      this.rows().map(r => r.city),
      'Orders',
      this.rows().map(r => r.orders)
    )
  );

  readonly customerPie = computed(() =>
    createPieChartConfig(
      'donut',
      300,
      this.rows().map(r => r.city),
      this.rows().map(r => r.customers)
    )
  );
}
