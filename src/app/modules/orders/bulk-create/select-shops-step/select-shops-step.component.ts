import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopsService } from '../../../../core/services/shops.service';

@Component({
  selector: 'app-select-shops-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-shops-step.component.html'
})
export class SelectShopsStepComponent {

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  shopService = inject(ShopsService);

  shops = signal<any[]>([]);
  selected = signal<{[id:string]: boolean}>({});

  ngOnInit() {
    // load shops (mock)
    this.shopService.loadShopsForDate('today');

    // wait for signal to update
    setTimeout(() => {
      const list = this.shopService.getShops();
      this.shops.set(list);

      // initialize shop checkbox map
      this.selected.set(
        Object.fromEntries(list.map(s=>[s.id,false]))
      );
    },450);
  }

  toggleAll(event:any){
    const checked = event.target.checked;
    this.selected.set(
      Object.fromEntries(this.shops().map(s=>[s.id,checked]))
    );
  }

  toggleOne(id:string,value:boolean){
    this.selected.update(v=>({...v,[id]:value}));
  }

  goNext(){
    const selectedList = this.shops().filter(s=>this.selected()[s.id]);
    this.shopService.setSelectedShops(selectedList);
    this.next.emit(); // move to next bulk step
  }
}
