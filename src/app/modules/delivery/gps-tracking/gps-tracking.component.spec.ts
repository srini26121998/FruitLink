import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsTrackingComponent } from './gps-tracking.component';

describe('GpsTrackingComponent', () => {
  let component: GpsTrackingComponent;
  let fixture: ComponentFixture<GpsTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpsTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpsTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
