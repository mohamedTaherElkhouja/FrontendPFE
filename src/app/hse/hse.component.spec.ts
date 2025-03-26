import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSEComponent } from './hse.component';

describe('HSEComponent', () => {
  let component: HSEComponent;
  let fixture: ComponentFixture<HSEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HSEComponent]
    });
    fixture = TestBed.createComponent(HSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
