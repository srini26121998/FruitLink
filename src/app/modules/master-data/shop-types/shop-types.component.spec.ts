import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTypesComponent } from './shop-types.component';

describe('ShopTypesComponent', () => {
  let component: ShopTypesComponent;
  let fixture: ComponentFixture<ShopTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
