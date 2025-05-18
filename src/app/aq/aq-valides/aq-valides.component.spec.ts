import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqValidesComponent } from './aq-valides.component';

describe('AqValidesComponent', () => {
  let component: AqValidesComponent;
  let fixture: ComponentFixture<AqValidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AqValidesComponent]
    });
    fixture = TestBed.createComponent(AqValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
