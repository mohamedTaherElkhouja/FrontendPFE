import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAqComponent } from './profil-aq.component';

describe('ProfilAqComponent', () => {
  let component: ProfilAqComponent;
  let fixture: ComponentFixture<ProfilAqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilAqComponent]
    });
    fixture = TestBed.createComponent(ProfilAqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
