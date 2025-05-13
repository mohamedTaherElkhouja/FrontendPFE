import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerviewComponent } from './users-perview.component';

describe('UsersPerviewComponent', () => {
  let component: UsersPerviewComponent;
  let fixture: ComponentFixture<UsersPerviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPerviewComponent]
    });
    fixture = TestBed.createComponent(UsersPerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
