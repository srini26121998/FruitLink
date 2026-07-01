import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDrilldownComponent } from './product-drilldown.component';

describe('ProductDrilldownComponent', () => {
  let component: ProductDrilldownComponent;
  let fixture: ComponentFixture<ProductDrilldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDrilldownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
