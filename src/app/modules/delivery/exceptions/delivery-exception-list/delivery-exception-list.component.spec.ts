import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryExceptionListComponent } from './delivery-exception-list.component';

describe('DeliveryExceptionListComponent', () => {
  let component: DeliveryExceptionListComponent;
  let fixture: ComponentFixture<DeliveryExceptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryExceptionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryExceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
