import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideHseComponent } from './side-hse.component';

describe('SideHseComponent', () => {
  let component: SideHseComponent;
  let fixture: ComponentFixture<SideHseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideHseComponent]
    });
    fixture = TestBed.createComponent(SideHseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
