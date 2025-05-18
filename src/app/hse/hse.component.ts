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
  selectedPv: any = null;
  HSE_Commentaire: string = '';

  constructor(private pvService: PvDechetServiceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadPvsForHSE();
  }

  loadPvsForHSE(): void {
    this.pvService.getPvDechetsForHSE().subscribe({
      next: (data: any) => {
        this.pvsForHSE = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Erreur lors du chargement des PVs', 'Erreur');
      }
    });
  }

  openValidationModal(pv: any): void {
    this.selectedPv = pv;
    this.HSE_Commentaire = ''; // Reset the comment
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

    const payload = { HSE_Commentaire: this.HSE_Commentaire };

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
}
