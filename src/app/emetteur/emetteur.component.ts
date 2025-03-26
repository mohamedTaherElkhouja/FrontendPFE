import { Component, OnInit } from '@angular/core';
import { PvDechetServiceService } from '../Service/pv-dechet-service.service';
import { AuthService } from '../Service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { pvDechet } from '../model/pvDechet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../Service/categorie.service';
import { Categorie } from '../model/categorie';


@Component({
  selector: 'app-emetteur',
  templateUrl: './emetteur.component.html',
  styleUrls: ['./emetteur.component.scss']
})
export class EmetteurComponent implements OnInit{
  pvDechet:pvDechet[]=[]
  user!:any
  pvDechetForm!:FormGroup
  categorie :Categorie [] | any

  constructor(private CategorieService : CategorieService,private pvDechetService:PvDechetServiceService,private auth:AuthService,private http:HttpClient,private fb:FormBuilder){

  }
  createForm() {
    this.pvDechetForm = this.fb.group({
      _id: [''], // Not required when creating
      Date_Creation: ['', Validators.required],
      Id_User: ['', Validators.required],
      Nature_Dechet: ['', Validators.required],
      Type_Dechet: ['', Validators.required],
      Designation: ['', [Validators.required, Validators.minLength(3)]],
      Num_lot: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      Quantite: ['', Validators.required],
      Motif_Rejet: ['', Validators.required],
      Commentaire: ['']
    });
  }
  ngOnInit(): void {
    this.user=this.auth.getUser().user
    this.createForm();
    this.getAllCategorie()

  }
  getAllCategorie(){
    this.CategorieService.getAllCategories(this.categorie).subscribe(
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
  submitAddPvDechet() { 
    const formData: pvDechet = this.pvDechetForm.value;
    formData.Id_User = this.user._id; 
    console.log("Form Data Sent:", formData); // Debugging
  
    this.pvDechetService.addPvDechet(formData).subscribe({
      next: (response) => {
        if(response.statut == 201)
          console.log('PvDechet Created:', response);
          alert("PvDechet successfully created!");
          this.pvDechetForm.reset();
      },
      error: (error) => {
        console.error("Error creating PvDechet:", error);
        alert("Failed to create PvDechet. Please try again.");
      }
    });
  }
  
  

}
