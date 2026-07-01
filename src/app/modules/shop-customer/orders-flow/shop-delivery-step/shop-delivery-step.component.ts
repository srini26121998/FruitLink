import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  standalone:true,
  selector:'app-shop-delivery-step',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./shop-delivery-step.component.html'
})
export class ShopDeliveryStepComponent {

  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();

  slots = ['5-7AM','7-9AM','9-11AM','Evening','Next Day'];

  form!: FormGroup;   // ← declare first

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      shopName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      addressLine: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      gstNo: [''],
      slot: ['', Validators.required],
      notes: ['']
    });
  }

  submit(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    this.next.emit(this.form.value);
  }
}
