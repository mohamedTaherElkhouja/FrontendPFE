import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-aq',
  templateUrl: './side-aq.component.html',
  styleUrls: ['./side-aq.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule] // Import CommonModule and RouterModule here
})
export class SideAqComponent {
  currentRole: string | null = 'AQ'; // Example role
  AQMenu = [
    { label: 'Tableau de bord AQ', link: '/user/AQ', icon: 'fas fa-tachometer-alt' ,active : false},
    { label: 'PV validés', link: '/aq/valides', icon: 'fas fa-clipboard-check',active : false },
    { label: 'Profil AQ', link: '/aq/profile', icon: 'fas fa-user-shield',active : false },
    { label: 'Paramètres AQ', link: '/aq/settings', icon: 'fas fa-cogs' ,active : false}
  ];

  constructor(private router: Router) {}

  logout(): void {
    // Clear user data (e.g., remove token from localStorage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentRole');

    // Redirect to the login page
    this.router.navigate(['/user/login']);
  }
}


