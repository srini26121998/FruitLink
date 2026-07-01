import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFrequencyComponent } from './shop-frequency.component';

describe('ShopFrequencyComponent', () => {
  let component: ShopFrequencyComponent;
  let fixture: ComponentFixture<ShopFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFrequencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
