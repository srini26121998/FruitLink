import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesComparisonComponent } from './sales-comparison.component';

describe('SalesComparisonComponent', () => {
  let component: SalesComparisonComponent;
  let fixture: ComponentFixture<SalesComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
