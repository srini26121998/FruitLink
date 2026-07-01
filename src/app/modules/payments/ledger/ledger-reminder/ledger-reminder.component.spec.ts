import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerReminderComponent } from './ledger-reminder.component';

describe('LedgerReminderComponent', () => {
  let component: LedgerReminderComponent;
  let fixture: ComponentFixture<LedgerReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedgerReminderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
