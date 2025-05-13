import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { pvDechet } from '../model/pvDechet';

@Component({
  selector: 'app-aq',
  templateUrl: './aq.component.html',
  styleUrls: ['./aq.component.scss']
})
export class AQComponent implements OnInit {
  userName: string = 'Technicien AQ'; // Replace with dynamic username if needed

  pvsAValider: number = 0;
  pvsValidesAQ: number = 0;
  totalPvTraites: number = 0;

  searchReference: string = '';
  searchStatus: string = '';

  allPvDechets: pvDechet[] = [];
  filteredPvDechet: pvDechet[] = [];

  selectedPvForAQ: pvDechet | null = null;
  constructor(private pvService: PvDechetServiceService, private http: HttpClient) {}
 

  ngOnInit(): void {
    this.loadPVs();
  }
  loadPVs(): void {
    const url = 'http://localhost:3000/pvDechet/getPvDechetsByAQ';
  
    this.http.get<pvDechet[]>(url).subscribe(
      (response) => {
        console.log('PVs chargés:', response);
        this.allPvDechets = response;
        this.filteredPvDechet = response;
        this.updateStats();
      },
      (error) => {
        console.error('Erreur lors du chargement des PVs :', error);
      }
    );
  }
  

  updateStats(): void {
    this.pvsAValider = this.allPvDechets.filter(pv => !pv.AQ_Validated).length;
    this.pvsValidesAQ = this.allPvDechets.filter(pv => pv.AQ_Validated).length;
    this.totalPvTraites = this.allPvDechets.length;
  }

  openValidationModal(pv: pvDechet): void {
    this.selectedPvForAQ = { ...pv }; // Clone object to avoid direct binding
  }

  validatePvByAQ(): void {
    if (!this.selectedPvForAQ) return;
  
    const {
      _id,
      AQ_Commentaire,
      AQ_Quantite_Avant,
      AQ_Quantite_Apres
    } = this.selectedPvForAQ;
  
    this.pvService.validatePvByAQ(_id.toString(), {
      AQ_Validated: true,
      AQ_Commentaire,
      AQ_Quantite_Avant,
      AQ_Quantite_Apres,
      statut: 'valider' // ➕ On envoie également le statut à mettre à jour
    }).subscribe({
      next: () => {
        console.log('PV validé avec succès et statut mis à jour.');
        this.selectedPvForAQ = null;
        this.loadPVs(); 
      },
      error: (error) => {
        console.error('Erreur lors de la validation du PV :', error);
      }
    });
  }
  showOnlyValidatedPv(): void {
    this.filteredPvDechet = this.allPvDechets.filter(pv => pv.AQ_Validated);
  }

  filterPVs(): void {
    this.filteredPvDechet = this.allPvDechets.filter(pv => {
      const matchesReference = this.searchReference
        ? pv.Designation.toLowerCase().includes(this.searchReference.toLowerCase())
        : true;
      const matchesStatus = this.searchStatus
        ? (this.searchStatus === 'valider' && pv.AQ_Validated) ||
          (this.searchStatus === 'enregistrer' && !pv.AQ_Validated)
        : true;
      return matchesReference && matchesStatus;
    });
  }
}
