import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStepperComponent } from '../../../../shared/components/order-stepper/order-stepper.component';
import { ShopProductsStepComponent } from '../shop-products-step/shop-products-step.component';
import { ShopCartStepComponent } from '../shop-cart-step/shop-cart-step.component';
import { ShopDeliveryStepComponent } from '../shop-delivery-step/shop-delivery-step.component';
import { ShopPaymentStepComponent } from '../shop-payment-step/shop-payment-step.component';
import { ShopConfirmStepComponent } from '../shop-confirm-step/shop-confirm-step.component';

@Component({
  standalone:true,
  selector:'app-order-flow',
  templateUrl:'./order-flow.component.html',
  imports:[
    CommonModule,
    OrderStepperComponent,
    ShopProductsStepComponent,
    ShopCartStepComponent,
    ShopDeliveryStepComponent,
    ShopPaymentStepComponent,
    ShopConfirmStepComponent
  ]
})
export class OrderFlowComponent {

  step = 1;
  data:any = {};  // collect all steps data

  next(ev?:any){
    if(ev) this.data = {...this.data,...ev};
    this.step < 5 && this.step++;
    window.scrollTo({top:0,behavior:'smooth'});
  }
  back(){
    this.step > 1 && this.step--;
    window.scrollTo({top:0,behavior:'smooth'});
  }
}
