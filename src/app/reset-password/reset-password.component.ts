import axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token!: string | null;
  newpassword!: string;
  confirmPassword!: string;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  resetPassword() {
    console.log("Password:", this.newpassword);
    console.log("Confirm Password:", this.confirmPassword);
  
    // Vérifier que les mots de passe correspondent
    if (this.newpassword !== this.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
  
    // Vérifier la longueur minimale du mot de passe
    if (this.newpassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
  
    // Si la validation est passée, on fait la requête
    this.auth.resetPassword(this.token,  this.newpassword).subscribe(
      response => {
        alert("Your password has been changed.");
        console.log(response);
      },
      err => {
        alert("Error resetting password.");
        console.log(err);
      }
    );
  }
  
}
