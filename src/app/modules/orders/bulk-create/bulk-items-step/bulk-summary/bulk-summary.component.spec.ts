import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSummaryComponent } from './bulk-summary.component';

describe('BulkSummaryComponent', () => {
  let component: BulkSummaryComponent;
  let fixture: ComponentFixture<BulkSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
