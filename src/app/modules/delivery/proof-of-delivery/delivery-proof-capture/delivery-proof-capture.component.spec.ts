import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProofCaptureComponent } from './delivery-proof-capture.component';

describe('DeliveryProofCaptureComponent', () => {
  let component: DeliveryProofCaptureComponent;
  let fixture: ComponentFixture<DeliveryProofCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryProofCaptureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryProofCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
