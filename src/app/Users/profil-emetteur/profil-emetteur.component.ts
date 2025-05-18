import { Component } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-profil-emetteur',
  templateUrl: './profil-emetteur.component.html',
  styleUrls: ['./profil-emetteur.component.scss']
})
export class ProfilEmetteurComponent {
      
  userId : string | null = null;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUser()._id;
    console.log(this.userId);
  }




}
