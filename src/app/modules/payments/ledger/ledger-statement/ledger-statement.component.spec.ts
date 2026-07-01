import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerStatementComponent } from './ledger-statement.component';

describe('LedgerStatementComponent', () => {
  let component: LedgerStatementComponent;
  let fixture: ComponentFixture<LedgerStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
