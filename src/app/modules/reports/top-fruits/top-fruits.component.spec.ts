import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFruitsComponent } from './top-fruits.component';

describe('TopFruitsComponent', () => {
  let component: TopFruitsComponent;
  let fixture: ComponentFixture<TopFruitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopFruitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFruitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
