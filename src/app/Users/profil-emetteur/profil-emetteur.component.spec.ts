import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEmetteurComponent } from './profil-emetteur.component';

describe('ProfilEmetteurComponent', () => {
  let component: ProfilEmetteurComponent;
  let fixture: ComponentFixture<ProfilEmetteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilEmetteurComponent]
    });
    fixture = TestBed.createComponent(ProfilEmetteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
