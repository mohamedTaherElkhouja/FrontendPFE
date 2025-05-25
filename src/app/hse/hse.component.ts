import { Component, OnInit } from '@angular/core';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hse',
  templateUrl: './hse.component.html',
  styleUrls: ['./hse.component.scss']
})
export class HSEComponent implements OnInit {
  pvsForHSE: any[] = [];
  filteredPvsForHSE: any[] = [];
  selectedPv: any = null;
  HSE_Commentaire: string = '';

  // Statistiques
  pvsAValider: number = 0;
  pvsValidesHSE: number = 0;
  totalPvTraites: number = 0;

  searchReference: string = '';
  searchStatus: string = '';

  constructor(private pvService: PvDechetServiceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadPvsForHSE();
  }

  loadPvsForHSE(): void {
    this.pvService.getPvDechetsForHSE().subscribe({
      next: (data: any[]) => {
        this.pvsForHSE = data;
        this.filteredPvsForHSE = data;
        this.updateStats();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Erreur lors du chargement des PVs', 'Erreur');
      }
    });
  }

  updateStats(): void {
    this.pvsAValider = this.pvsForHSE.filter(pv => !pv.HSE_Validated).length;
    this.pvsValidesHSE = this.pvsForHSE.filter(pv => pv.HSE_Validated).length;
    this.totalPvTraites = this.pvsForHSE.length;
  }

  openValidationModal(pv: any): void {
    this.selectedPv = pv;
    this.HSE_Commentaire = '';
  }

  closeValidationModal(): void {
    this.selectedPv = null;
    this.HSE_Commentaire = '';
  }

  validatePvByHSE(): void {
    if (!this.selectedPv) {
      this.toastr.warning('Aucun PV sélectionné', 'Validation');
      return;
    }

    const payload = { 
      HSE_Commentaire: this.HSE_Commentaire,
      HSE_Validated: true,
      statut: 'valider'
    };

    this.pvService.validatePvByHSE(this.selectedPv._id, payload).subscribe({
      next: (data: any) => {
        this.toastr.success('PV validé avec succès', 'Succès');
        this.closeValidationModal();
        this.loadPvsForHSE();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Erreur lors de la validation du PV', 'Erreur');
      }
    });
  }

  showOnlyValidatedPv(): void {
    this.filteredPvsForHSE = this.pvsForHSE.filter(pv => pv.HSE_Validated);
  }

  filterPVs(): void {
    this.filteredPvsForHSE = this.pvsForHSE.filter(pv => {
      const matchesReference = this.searchReference
        ? pv.Designation?.toLowerCase().includes(this.searchReference.toLowerCase())
        : true;
      const matchesStatus = this.searchStatus
        ? (this.searchStatus === 'valider' && pv.HSE_Validated) ||
          (this.searchStatus === 'enregistrer' && !pv.HSE_Validated)
        : true;
      return matchesReference && matchesStatus;
    });
  }
}
