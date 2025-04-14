import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AQComponent } from './aq.component';

describe('AQComponent', () => {
  let component: AQComponent;
  let fixture: ComponentFixture<AQComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AQComponent]
    });
    fixture = TestBed.createComponent(AQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
