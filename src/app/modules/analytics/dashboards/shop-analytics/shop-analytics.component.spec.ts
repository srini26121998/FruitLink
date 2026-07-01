import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAnalyticsComponent } from './shop-analytics.component';

describe('ShopAnalyticsComponent', () => {
  let component: ShopAnalyticsComponent;
  let fixture: ComponentFixture<ShopAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
