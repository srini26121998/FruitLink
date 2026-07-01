import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerSettlementComponent } from './ledger-settlement.component';

describe('LedgerSettlementComponent', () => {
  let component: LedgerSettlementComponent;
  let fixture: ComponentFixture<LedgerSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerSettlementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
