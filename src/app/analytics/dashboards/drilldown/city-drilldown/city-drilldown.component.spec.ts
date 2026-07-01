import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDrilldownComponent } from './city-drilldown.component';

describe('CityDrilldownComponent', () => {
  let component: CityDrilldownComponent;
  let fixture: ComponentFixture<CityDrilldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityDrilldownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityDrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
