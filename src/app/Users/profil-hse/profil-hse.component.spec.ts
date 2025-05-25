import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilHseComponent } from './profil-hse.component';

describe('ProfilHseComponent', () => {
  let component: ProfilHseComponent;
  let fixture: ComponentFixture<ProfilHseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilHseComponent]
    });
    fixture = TestBed.createComponent(ProfilHseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
