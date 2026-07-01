import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOverridesComponent } from './price-overrides.component';

describe('PriceOverridesComponent', () => {
  let component: PriceOverridesComponent;
  let fixture: ComponentFixture<PriceOverridesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceOverridesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceOverridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
