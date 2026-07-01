import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkProductAutocompleteComponent } from './bulk-product-autocomplete.component';

describe('BulkProductAutocompleteComponent', () => {
  let component: BulkProductAutocompleteComponent;
  let fixture: ComponentFixture<BulkProductAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkProductAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkProductAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
