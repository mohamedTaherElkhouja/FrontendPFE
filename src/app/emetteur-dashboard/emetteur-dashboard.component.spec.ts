import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmetteurDashboardComponent } from './emetteur-dashboard.component';

describe('EmetteurDashboardComponent', () => {
  let component: EmetteurDashboardComponent;
  let fixture: ComponentFixture<EmetteurDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmetteurDashboardComponent]
    });
    fixture = TestBed.createComponent(EmetteurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
