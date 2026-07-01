import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProofViewComponent } from './delivery-proof-view.component';

describe('DeliveryProofViewComponent', () => {
  let component: DeliveryProofViewComponent;
  let fixture: ComponentFixture<DeliveryProofViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryProofViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryProofViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
