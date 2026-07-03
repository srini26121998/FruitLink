import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';

interface ReportConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [
    trigger('staggerCards', [
      transition(':enter', [
        query('.report-card', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          stagger('100ms', [
            animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ReportsComponent implements OnInit {

  reportTypes: ReportConfig[] = [
    { id: 'sales_summary', name: 'Sales Summary', description: 'Aggregated view of daily, weekly, and monthly sales.', icon: 'point_of_sale', color: 'text-indigo-600 bg-indigo-100 ring-indigo-500' },
    { id: 'shop_performance', name: 'Shop Performance', description: 'Metrics on individual shop orders, revenue, and ratings.', icon: 'storefront', color: 'text-emerald-600 bg-emerald-100 ring-emerald-500' },
    { id: 'outstanding_dues', name: 'Outstanding Dues', description: 'List of shops with pending payments exceeding limit.', icon: 'account_balance_wallet', color: 'text-rose-600 bg-rose-100 ring-rose-500' },
    { id: 'inventory_demand', name: 'Inventory Demand', description: 'Forecasts and historical data for product demand.', icon: 'inventory_2', color: 'text-amber-600 bg-amber-100 ring-amber-500' },
    { id: 'salesman_activity', name: 'Salesman Activity', description: 'Tracking salesman visits, orders collected, and performance.', icon: 'directions_walk', color: 'text-blue-600 bg-blue-100 ring-blue-500' },
    { id: 'customer_feedback', name: 'Customer Feedback', description: 'Reviews, ratings, and feedback collected from shops.', icon: 'feedback', color: 'text-purple-600 bg-purple-100 ring-purple-500' }
  ];

  selectedReport: string = 'sales_summary';
  dateRange: string = 'last_30_days';
  format: string = 'pdf';
  isGenerating: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  generateReport() {
    this.isGenerating = true;
    setTimeout(() => {
      this.isGenerating = false;
      // Show success notification or trigger download
      alert(`Report generated successfully in ${this.format.toUpperCase()} format.`);
    }, 1500);
  }

}
