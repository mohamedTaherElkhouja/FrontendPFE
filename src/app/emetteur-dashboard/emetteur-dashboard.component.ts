import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { pvDechet } from '../model/pvDechet';
import { Categorie } from '../model/categorie';
import { CategorieService } from '../Service/categorie.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-emetteur-dashboard',
  templateUrl: './emetteur-dashboard.component.html',
  styleUrls: ['./emetteur-dashboard.component.scss'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class EmetteurDashboardComponent implements OnInit {
  categorie: Categorie[] | any;
  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private auth: AuthService,
    private PvService: PvDechetServiceService,
    private CategerieSer: CategorieService
  ) {}

  id!: String;
  PvDechet: pvDechet[] = [];
  userName: string = '';
  totalPVs: number = 0;
  pendingPVs: number = 0;
  validatedPVs: number = 0;
  selectedPv: any = null;
  searchReference: string = '';
  searchStatus: string = '';

  ngOnInit(): void {
    const userData = this.auth.getUser();
    if (!userData || !userData.user) {
      // Optionally redirect or show an error
      // For example:
      // this.toast.error('Utilisateur non trouvé. Veuillez vous reconnecter.', 'Erreur');
      // this.router.navigate(['/login']);
      return;
    }
    this.id = userData.user._id;
    this.userName = userData.user.nom;
    this.getAllPV(this.id);
    this.getAllCategorie();
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

  getAllCategorie() {
    this.CategerieSer.getAllCategories(this.categorie).subscribe({
      next: data => {
        this.categorie = data;
        console.log(this.categorie);
      },
      error: e => {
        console.log(e);
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
    if (!this.selectedPv) {
      console.error("No PV selected for modification");
      return;
    }

    // Format Date_Creation to YYYY-MM-DD
    const formattedDate = this.datePipe.transform(this.selectedPv.Date_Creation, 'yyyy-MM-dd');

    const payload = {
      Nature_Dechet: this.selectedPv.Nature_Dechet,
      Type_Dechet: this.selectedPv.Type_Dechet,
      Service_Emetteur: this.selectedPv.Service_Emetteur,
      Designation: this.selectedPv.Designation,
      Quantite: this.selectedPv.Quantite,
      Num_lot: this.selectedPv.Num_lot,
      Motif_Rejet: this.selectedPv.Motif_Rejet,
      Commentaire: this.selectedPv.Commentaire,
      Date_Creation: formattedDate // Use the formatted date
    };

    console.log("Sending payload for modification:", payload);
    console.log("Sending payload for modification:", payload);

    this.PvService.modifyPv(pvId, payload).subscribe({
      next: res => {
        console.log("PV modified successfully", res);
        this.selectedPv = null; // Clear the selected PV after modification
        this.getAllPV(this.id); // Refresh the list of PVs
      },
      error: err => {
        console.error("Error during modification", err);
      }
    });
  }

  openEditModal(pv: any) {
    const pvCopy = { ...pv };
    if (pvCopy.Date_Creation) {
      const date = new Date(pvCopy.Date_Creation);
      if (!isNaN(date.getTime())) {
        pvCopy.Date_Creation = this.datePipe.transform(date, 'yyyy-MM-dd'); // Format to YYYY-MM-DD
      }
    }
    this.selectedPv = pvCopy;
  }

  onDateChange(event: any) {
    if (event) {
      const date = new Date(event);
      if (!isNaN(date.getTime())) {
        this.selectedPv.Date_Creation = this.datePipe.transform(date, 'yyyy-MM-dd'); // Format to YYYY-MM-DD
      }
    }
  }

  updatePv() {
    if (!this.selectedPv) return;

    const updatedPv = { ...this.selectedPv };

    if (updatedPv.Date_Creation) {
      try {
        const [year, month, day] = updatedPv.Date_Creation.split('-').map(Number);
        const date = new Date(year, month - 1, day, 12, 0, 0);
        if (isNaN(date.getTime())) {
          console.error('Invalid date');
          return;
        }
        updatedPv.Date_Creation = date;
      } catch (error) {
        console.error('Error processing date:', error);
        return;
      }
    }

    Object.keys(updatedPv).forEach(key => {
      if (updatedPv[key] === undefined || updatedPv[key] === null) {
        delete updatedPv[key];
      }
    });

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

  onSubmit() {
    if (this.selectedPv) {
      // Call modifyPvDechet with the selected PV's ID
      this.modifyPvDechet(this.selectedPv._id);
    }
  }

  get filteredPvDechet() {
    return this.PvDechet.filter(pv => {
      const matchesReference = this.searchReference
        ? pv.Designation.toLowerCase().includes(this.searchReference.toLowerCase())
        : true;
      const matchesStatus = this.searchStatus
        ? pv.statut === this.searchStatus
        : true;
      return matchesReference && matchesStatus;
    });
  }
}
