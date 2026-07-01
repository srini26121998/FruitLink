import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFlowComponent } from '../order-flow/order-flow.component';

@Component({
  standalone:true,
  selector:'app-shop-order-create',
  imports:[CommonModule,OrderFlowComponent],
  templateUrl:'./shop-order-create.component.html'
})
export class ShopOrderCreateComponent {
  start(){ window.scrollTo({top:0,behavior:'smooth'}); }
}
