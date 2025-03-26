import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmetteurComponent } from './emetteur.component';

describe('EmetteurComponent', () => {
  let component: EmetteurComponent;
  let fixture: ComponentFixture<EmetteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmetteurComponent]
    });
    fixture = TestBed.createComponent(EmetteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
