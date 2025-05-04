import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { pvDechet } from '../model/pvDechet';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-emetteur-dashboard',
  templateUrl: './emetteur-dashboard.component.html',
  styleUrls: ['./emetteur-dashboard.component.scss']
})
export class EmetteurDashboardComponent implements OnInit {
  categorie: Categorie[] | any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private PvService: PvDechetServiceService
  ) {}

  id!: String;
  PvDechet: pvDechet[] = [];
  userName: string = '';
  totalPVs: number = 0;
  pendingPVs: number = 0;
  validatedPVs: number = 0;
  selectedPv: any = null;

  ngOnInit(): void {
    this.id = this.auth.getUser().user._id;
    this.userName = this.auth.getUser().user.nom;
    this.getAllPV(this.id);
  }

  getAllPV(id: String) {
    this.PvService.GetAllPVByEmetteur(id).subscribe({
      next: data => {
        this.PvDechet = data;
        this.calculateStatistics();
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private calculateStatistics() {
    this.totalPVs = this.PvDechet.length;
    this.pendingPVs = this.PvDechet.filter(pv => pv.statut === 'enregistrer').length;
    this.validatedPVs = this.PvDechet.filter(pv => pv.statut === 'valider').length;
  }

  fromSavedtoValidated(dechetId: String) {
    if (confirm("Are you sure you want to validate this PV?")) {
      this.PvService.fromSavedtoValidate(dechetId).subscribe(
        response => {
          console.log("Data validated");
          window.location.reload();
        },
        error => {
          console.error("An error occurred:", error);
        }
      );
    }
  }

  getPvDechetById(pvDechetId: string) {
    this.PvService.getPvDechetById(pvDechetId).subscribe(
      response => {
        console.log("PvDechet received:", response);
        this.PvDechet = Array.isArray(response) ? response : [response];
      },
      error => {
        console.error("Error fetching PvDechet:", error);
      }
    );
  }

  modifyPvDechet(pvId: string) {
    const pv = this.PvDechet.find(p => p._id === pvId);
    if (!pv) {
      console.error("PV not found");
      return;
    }

    const payload = {
      Date_Creation: pv.Date_Creation,

      Nature_Dechet: pv.Nature_Dechet,
      Type_Dechet: pv.Type_Dechet,
      Service_Emetteur: pv.Service_Emetteur,
      Designation: pv.Designation,
      Quantite: pv.Quantite,
      Num_lot: pv.Num_lot,
      Motif_Rejet: pv.Motif_Rejet,
      Commentaire: pv.Commentaire
    };

    this.PvService.modifyPv(pvId, payload).subscribe({
      next: res => {
        console.log("PV modifié avec succès", res);
        this.getAllPV(this.id);
      },
      error: err => {
        console.error("Erreur lors de la modification", err);
      }
    });
  }


  

  openEditModal(pv: any) {
    this.selectedPv = { ...pv };
  }

  updatePv() {
    if (!this.selectedPv) return;

    this.PvService.modifyPv(this.selectedPv._id, this.selectedPv).subscribe(
      res => {
        console.log('PV mis à jour avec succès', res);
        this.selectedPv = null;
        this.getAllPV(this.id);
      },
      err => {
        console.error('Erreur lors de la mise à jour du PV', err);
      }
    );
  }
}
