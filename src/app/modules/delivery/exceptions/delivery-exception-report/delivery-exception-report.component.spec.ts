import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryExceptionReportComponent } from './delivery-exception-report.component';

describe('DeliveryExceptionReportComponent', () => {
  let component: DeliveryExceptionReportComponent;
  let fixture: ComponentFixture<DeliveryExceptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryExceptionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryExceptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
