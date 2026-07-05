import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { ShopManagementService, Shop } from '../services/shop-management.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-salesman-assign',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './salesman-assign.component.html',
  styleUrls: ['./salesman-assign.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger('50ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SalesmanAssignComponent implements OnInit {

  shops: Shop[] = [];
  salesmen = [
    { id: 'S-1', name: 'Amit Kumar', zone: 'North', activeShops: 45 },
    { id: 'S-2', name: 'Vikram Singh', zone: 'South', activeShops: 38 },
    { id: 'S-3', name: 'Suresh Patel', zone: 'East', activeShops: 22 },
    { id: 'S-4', name: 'Priya Sharma', zone: 'West', activeShops: 30 }
  ];

  selectedSalesmanId: string = '';
  searchQuery: string = '';

  constructor(private shopService: ShopManagementService) {}

  ngOnInit(): void {
    this.shopService.getShops().subscribe(data => {
      this.shops = data;
    });
  }

  get filteredShops() {
    return this.shops.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchSalesman = this.selectedSalesmanId ? s.assignedSalesman === this.getSalesmanName(this.selectedSalesmanId) : true;
      return matchSearch && matchSalesman;
    });
  }

  getSalesmanName(id: string): string {
    return this.salesmen.find(s => s.id === id)?.name || '';
  }

  assignSalesman(shopId: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    const newSalesman = select.value;
    
    // Optimistic update
    const shopIndex = this.shops.findIndex(s => s.id === shopId);
    if (shopIndex > -1) {
      this.shops[shopIndex].assignedSalesman = newSalesman;
    }

    this.shopService.updateShop(shopId, { assignedSalesman: newSalesman }).subscribe();
  }
}
