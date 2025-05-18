import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HseValidesComponent } from './hse-valides.component';

describe('HseValidesComponent', () => {
  let component: HseValidesComponent;
  let fixture: ComponentFixture<HseValidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HseValidesComponent]
    });
    fixture = TestBed.createComponent(HseValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
