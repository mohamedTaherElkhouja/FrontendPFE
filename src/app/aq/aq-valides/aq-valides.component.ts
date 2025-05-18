import { Component, OnInit } from '@angular/core';
import { PvDechetServiceService } from '../../Service/pv-dechet-service.service';
import { pvDechet } from '../../model/pvDechet';
import { SideAqComponent } from '../side-aq/side-aq.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aq-valides',
  templateUrl: './aq-valides.component.html',
  styleUrls: ['./aq-valides.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterModule, SideAqComponent] // Import CommonModule here
})
export class AqValidesComponent implements OnInit {
  pvValides: pvDechet[] = [];

  constructor(private pvService: PvDechetServiceService) {}

  ngOnInit(): void {
    this.getValidatedPvs();
  }

  getValidatedPvs(): void {
    this.pvService.getPvValidesParAQ().subscribe({
      next: (data: any) => {
        console.log('📦 Données reçues depuis l’API :', data);
        // Sort the data by Date_Creation in descending order
        this.pvValides = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.Date_Creation).getTime() - new Date(a.Date_Creation).getTime())
          : [];
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des PV validés par AQ :', err.message);
      }
    });
  }
}
