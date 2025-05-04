import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PVDechetAdminComponent } from './pvdechet-admin.component';

describe('PVDechetAdminComponent', () => {
  let component: PVDechetAdminComponent;
  let fixture: ComponentFixture<PVDechetAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PVDechetAdminComponent]
    });
    fixture = TestBed.createComponent(PVDechetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
