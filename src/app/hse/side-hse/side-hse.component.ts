import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-hse',
  templateUrl: './side-hse.component.html',
  styleUrls: ['./side-hse.component.scss'],
   standalone: true,
    imports: [CommonModule, RouterModule]
})
export class SideHseComponent {
  currentRole: string | null = 'HSE'; // Example role
    HSEMenu = [
      { label: 'Tableau de bord HSE', link: '/user/HSE', icon: 'fas fa-tachometer-alt' ,active : false},
      { label: 'PV validés', link: '/hse/valides', icon: 'fas fa-clipboard-check',active : false },
      { label: 'Profil HSE', link: '/hse/profile', icon: 'fas fa-user-shield',active : false },
      { label: 'Paramètres HSE', link: '/hse/settings', icon: 'fas fa-cogs', active : false}
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
