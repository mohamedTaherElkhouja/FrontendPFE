import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emetteur-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  totalPVs: number = 0;
  pendingPVs: number = 0;
  validatedPVs: number = 0;
  recentPVs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'Utilisateur';

    // Fetch PVs data
    this.fetchPVsData();
  }

  fetchPVsData() {
    // Replace with your actual API endpoint
    this.http.get('YOUR_API_ENDPOINT/pvs').subscribe(
      (data: any) => {
        this.totalPVs = data.total;
        this.pendingPVs = data.pending;
        this.validatedPVs = data.validated;
        this.recentPVs = data.recent;
      },
      error => {
        console.error('Error fetching PVs data:', error);
      }
    );
  }
} 