import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanAssignComponent } from './salesman-assign.component';

describe('SalesmanAssignComponent', () => {
  let component: SalesmanAssignComponent;
  let fixture: ComponentFixture<SalesmanAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesmanAssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
