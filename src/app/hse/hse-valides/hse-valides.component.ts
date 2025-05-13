import { Component, OnInit } from '@angular/core';
import { PvDechetServiceService } from '../../Service/pv-dechet-service.service';
import { pvDechet } from '../../model/pvDechet';

@Component({
  selector: 'app-hse-valides',
  templateUrl: './hse-valides.component.html',
  styleUrls: ['./hse-valides.component.scss']
})
export class HseValidesComponent implements OnInit {
  pvValidesHSE: pvDechet[] = []; // List of validated PVs by HSE

  constructor(private pvService: PvDechetServiceService) {}

  ngOnInit(): void {
    this.getValidatedPvsByHSE();
  }

  // Fetch validated PVs by HSE
  getValidatedPvsByHSE(): void {
    this.pvService.getValidatedPvByHSE().subscribe({
      next: (data: any) => {
        console.log('📦 Données reçues depuis l’API :', data);
        // Sort the data by Date_Creation in descending order
        this.pvValidesHSE = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.Date_Creation).getTime() - new Date(a.Date_Creation).getTime())
          : [];
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des PV validés par HSE :', err.message);
      }
    });
  }
}
