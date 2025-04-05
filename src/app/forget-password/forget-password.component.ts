import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private http :HttpClient, private auth :AuthService){}
  email !: String

  ForgetPassword(){
    this.auth.forgetPassword(this.email).subscribe(
      response=>{
        console.log("Email sended with success")
        alert('Check Your Email')
      },err=>{
        console.log(err)
        alert('Something Wrong')
      }
    )
  }
}
