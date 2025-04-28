import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { pvDechet } from '../model/pvDechet';
import { Categorie } from '../model/categorie';
import { CategorieService } from '../Service/categorie.service';

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
    private PvService: PvDechetServiceService,
    private CategerieSer : CategorieService
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
    this.getAllCategorie()
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
  getAllCategorie(){
    this.CategerieSer.getAllCategories(this.categorie).subscribe(
      {
        next :data =>{
          this.categorie = data
          console.log(this.categorie)
        }, error :e =>{
          console.log(e)
        }
      }
    )
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
    // Format the date to YYYY-MM-DD when opening the modal
    const pvCopy = { ...pv };
    if (pvCopy.Date_Creation) {
      const date = new Date(pvCopy.Date_Creation);
      if (!isNaN(date.getTime())) {
        pvCopy.Date_Creation = date.toISOString().split('T')[0];
      }
    }
    this.selectedPv = pvCopy;
  }

  onDateChange(event: any) {
    if (event) {
      // Ensure the date is in the correct format when it changes
      const date = new Date(event);
      if (!isNaN(date.getTime())) {
        this.selectedPv.Date_Creation = date.toISOString().split('T')[0];
      }
    }
  }

  updatePv() {
    if (!this.selectedPv) return;

    // Create a copy of the selected PV
    const updatedPv = { ...this.selectedPv };
    
    // Convert the date string to a Date object for MongoDB
    if (updatedPv.Date_Creation) {
      try {
        // Parse the date string (assuming it's in YYYY-MM-DD format)
        const [year, month, day] = updatedPv.Date_Creation.split('-').map(Number);
        
        // Create a new Date object (use noon to avoid timezone issues)
        const date = new Date(year, month - 1, day, 12, 0, 0);
        
        if (isNaN(date.getTime())) {
          console.error('Invalid date');
          return;
        }
        
        // Assign the Date object directly
        updatedPv.Date_Creation = date;
      } catch (error) {
        console.error('Error processing date:', error);
        return;
      }
    }

    // Remove any undefined or null values from the payload
    Object.keys(updatedPv).forEach(key => {
      if (updatedPv[key] === undefined || updatedPv[key] === null) {
        delete updatedPv[key];
      }
    });

    // Log the payload for debugging
    console.log('Sending payload:', updatedPv);

    this.PvService.modifyPv(updatedPv._id, updatedPv).subscribe(
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
