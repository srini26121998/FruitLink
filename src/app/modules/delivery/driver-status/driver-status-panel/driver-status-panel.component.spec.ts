import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStatusPanelComponent } from './driver-status-panel.component';

describe('DriverStatusPanelComponent', () => {
  let component: DriverStatusPanelComponent;
  let fixture: ComponentFixture<DriverStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverStatusPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
