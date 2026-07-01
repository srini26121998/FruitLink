import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitCategoriesComponent } from './fruit-categories.component';

describe('FruitCategoriesComponent', () => {
  let component: FruitCategoriesComponent;
  let fixture: ComponentFixture<FruitCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
