import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', link: '/emetteur/dashbaord', icon: 'fas fa-home' },
    { label: 'PV de déchets', link: '/emetteur/pv', icon: 'fas fa-file-alt' },
    { label: 'Profil', link: '/emetteur/profile', icon: 'fas fa-user' },
    { label: 'Paramètres', link: '/emetteur/settings', icon: 'fas fa-cog' }
  ];
}
