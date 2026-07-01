import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderItem {
  fruit: string;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CreateComponent {

  fruits = [
    { name: 'Apple', price: 120 },
    { name: 'Orange', price: 80 },
    { name: 'Banana', price: 40 },
    { name: 'Grapes', price: 60 },
    { name: 'Mango', price: 150 }
  ];

  customer = {
    name: '',
    phone: '',
    address: '',
  };

  items: OrderItem[] = [
    { fruit: '', quantity: 1, price: 0, total: 0 }
  ];

  get orderTotal() {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  addItem() {
    this.items.push({ fruit: '', quantity: 1, price: 0, total: 0 });
  }

  removeItem(i: number) {
    if (this.items.length > 1) {
      this.items.splice(i, 1);
    }
  }

  updatePrice(i: number) {
    const selected = this.fruits.find(f => f.name === this.items[i].fruit);
    this.items[i].price = selected ? selected.price : 0;
    this.updateTotal(i);
  }

  updateTotal(i: number) {
    const item = this.items[i];
    item.total = item.quantity * item.price;
  }

  submitOrder() {
    console.log("ORDER SAVED:", {
      customer: this.customer,
      items: this.items,
      total: this.orderTotal
    });

    alert("Order Created Successfully!");
  }
}
