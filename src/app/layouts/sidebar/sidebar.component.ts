  import { Component, OnInit } from '@angular/core';
  import { Router, NavigationEnd, Event } from '@angular/router';
  import { filter } from 'rxjs/operators';
  import { RouterModule } from '@angular/router'; 
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
  })
  export class SidebarComponent implements OnInit {

    EmetteurMenu = [
      { label: 'Tableau de bord Emetteur', link: '/emetteur/dashbaord', icon: 'fas fa-home', active: false },
      { label: 'PV de déchets', link: '/emetteur/pv', icon: 'fas fa-file-alt', active: false },
      { label: 'Profil', link: '/emetteur/profil', icon: 'fas fa-user', active: false },
      { label: 'Paramètres', link: '/emetteur/settings', icon: 'fas fa-cog', active: false }
    ];
    
   

    currentRole: 'emetteur'  | null = null;

    constructor(private router: Router) {}

    ngOnInit(): void {
      this.updateMenu(this.router.url); // Init on load

      this.router.events
        .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.updateMenu(event.urlAfterRedirects);
        });
    }

    updateMenu(url: string) {
      if (url.startsWith('/emetteur')) {
        this.currentRole = 'emetteur';
      } else {
        this.currentRole = null;
      }
      this.EmetteurMenu.forEach(item => item.active = url.startsWith(item.link));
    
    }
    logout(): void {
    // Clear user data (e.g., remove token from localStorage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentRole');

    // Redirect to the login page
    this.router.navigate(['/user/login']);
  }
  }
