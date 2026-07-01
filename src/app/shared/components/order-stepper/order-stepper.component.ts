import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-stepper.component.html'
})
export class OrderStepperComponent {
  @Input() step = 1;                
  @Input() steps: string[] = [];    
  @Input() clickable = false;      

  @Output() stepChange = new EventEmitter<number>();

  changeStep(n:number){
    if(this.clickable){
      this.step = n;
      this.stepChange.emit(this.step);
    }
  }
}
