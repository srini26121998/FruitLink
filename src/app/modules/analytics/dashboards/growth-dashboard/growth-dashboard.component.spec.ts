import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthDashboardComponent } from './growth-dashboard.component';

describe('GrowthDashboardComponent', () => {
  let component: GrowthDashboardComponent;
  let fixture: ComponentFixture<GrowthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowthDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
