import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.fade-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AnalyticsComponent implements OnInit {

  kpis = [
    { title: 'Total Revenue', value: '₹12,45,000', change: '+15.2%', isPositive: true, icon: 'account_balance_wallet', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Active Shops', value: '1,245', change: '+5.4%', isPositive: true, icon: 'storefront', color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Pending Dues', value: '₹3,20,500', change: '-2.1%', isPositive: false, icon: 'receipt_long', color: 'text-rose-600', bg: 'bg-rose-100' },
    { title: 'Avg Order Value', value: '₹4,500', change: '+8.7%', isPositive: true, icon: 'shopping_cart', color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  topShops = [
    { name: 'Fresh Mart Downtown', orders: 154, revenue: '₹4.2L', status: 'Excellent', rating: 4.8 },
    { name: 'Daily Groceries', orders: 122, revenue: '₹3.5L', status: 'Good', rating: 4.5 },
    { name: 'Green Leaf Retail', orders: 98, revenue: '₹2.8L', status: 'Good', rating: 4.2 },
    { name: 'Sunrise Superstore', orders: 85, revenue: '₹2.1L', status: 'Average', rating: 3.9 },
    { name: 'City Traders', orders: 76, revenue: '₹1.9L', status: 'Average', rating: 3.8 }
  ];

  revenueData = [
    { month: 'Jan', revenue: 65, target: 60 },
    { month: 'Feb', revenue: 78, target: 70 },
    { month: 'Mar', revenue: 90, target: 80 },
    { month: 'Apr', revenue: 81, target: 90 },
    { month: 'May', revenue: 105, target: 100 },
    { month: 'Jun', revenue: 125, target: 110 }
  ];

  categoryPerformance = [
    { name: 'Exotic Fruits', percentage: 45, color: 'bg-indigo-500' },
    { name: 'Seasonal', percentage: 30, color: 'bg-emerald-500' },
    { name: 'Dry Fruits', percentage: 15, color: 'bg-amber-500' },
    { name: 'Organic', percentage: 10, color: 'bg-rose-500' }
  ];

  ngOnInit(): void {
    // Analytics initialization
  }
}
