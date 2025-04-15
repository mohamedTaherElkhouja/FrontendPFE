import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { response } from 'express';
import {pvDechet} from '../model/pvDechet';

@Component({
  selector: 'app-emetteur-dashboard',
  templateUrl: './emetteur-dashboard.component.html',
  styleUrls: ['./emetteur-dashboard.component.scss']
})
export class EmetteurDashboardComponent implements OnInit {
  constructor(private http:HttpClient,private auth : AuthService,private PvSevice: PvDechetServiceService){}
  id !:String
  PvDechet : pvDechet[]=[]
  userName: string = '';
  totalPVs: number = 0;
  pendingPVs: number = 0;
  validatedPVs: number = 0;

  ngOnInit(): void {
    this.id = this.auth.getUser().user._id;
    this.userName = this.auth.getUser().user.nom; // Assuming the user object has a 'nom' property
    this.getAllPV(this.id);
  }

  getAllPV(id : String){
    this.PvSevice.GetAllPVByEmetteur(id).subscribe({
      next : data => {
        this.PvDechet = data;
        this.calculateStatistics();
        console.log(data);
        console.log(this.PvDechet);
      },
      error : err => {
        console.log(err);
      }
    });
  }

  private calculateStatistics() {
    this.totalPVs = this.PvDechet.length;
    this.pendingPVs = this.PvDechet.filter(pv => pv.statut === 'enregistrer').length;
    this.validatedPVs = this.PvDechet.filter(pv => pv.statut === 'valider').length;
  }

  fromSavedtoValidated(dechetId: String){
    if(confirm("are you sure you want to change validate?")){
      this.PvSevice.fromSavedtoValidate(dechetId).subscribe(
        response => { 
          console.log ("your data is changed")
          window.location.reload(); 
        },
        error => {
          console.error("An error occurred:", error);
        }
      )
    }
  }
  getPvDechetById(pvDechetId: String) {
    this.PvSevice.getPvDechetById(pvDechetId).subscribe(
      (response) => {
        console.log("PvDechet received:", response);
        if (Array.isArray(response)) {
          this.PvDechet = response;
        } else {
          console.warn('Response is not an array:', response);
          this.PvDechet = [response]; // Wrapping the object into an array
        }
      },
      (error) => {
        console.error("Error fetching PvDechet:", error);
      }
    );
  }
  

}
