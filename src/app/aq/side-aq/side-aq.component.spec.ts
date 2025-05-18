import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAqComponent } from './side-aq.component';

describe('SideAqComponent', () => {
  let component: SideAqComponent;
  let fixture: ComponentFixture<SideAqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideAqComponent]
    });
    fixture = TestBed.createComponent(SideAqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
