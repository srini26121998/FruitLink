import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  standalone:true,
  selector:'app-shop-products-step',
  imports:[CommonModule],
  templateUrl:'./shop-products-step.component.html'
})
export class ShopProductsStepComponent {

  cart = inject(CartService);

  @Output() next = new EventEmitter<void>();

  // sample products - replace later with backend product list
  products = [
    { id:'APL', name:'Apple', price:120 },
    { id:'BNN', name:'Banana', price:50 },
    { id:'ORG', name:'Orange', price:90 },
    { id:'GRP', name:'Grapes', price:140 },
  ];

  qty = signal<{[id:string]:number}>({});

  increase(p:any){
    this.qty.update(q => ({...q, [p.id]:(q[p.id]||0)+1}));
  }

  decrease(p:any){
    if((this.qty()[p.id]||0)>0)
      this.qty.update(q => ({...q, [p.id]:q[p.id]-1}));
  }

  addToCart(p:any){
    const q=this.qty()[p.id]||0;
    if(q<=0) return;

    this.cart.addItem({ id:p.id, name:p.name, qty:q, unitId:'kg' });

    // reset qty after add
    this.qty.update(qty => ({...qty,[p.id]:0}));
  }

  continue(){
    this.next.emit();
  }
}
