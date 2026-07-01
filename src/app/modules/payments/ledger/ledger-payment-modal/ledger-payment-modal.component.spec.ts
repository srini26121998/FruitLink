import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerPaymentModalComponent } from './ledger-payment-modal.component';

describe('LedgerPaymentModalComponent', () => {
  let component: LedgerPaymentModalComponent;
  let fixture: ComponentFixture<LedgerPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerPaymentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
