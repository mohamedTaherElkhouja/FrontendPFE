import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { response } from 'express';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  forgetForm: FormGroup;
  email !: String

  constructor(
    private http: HttpClient, 
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ForgetPassword(){
    if (this.forgetForm.valid) {
      this.email = this.forgetForm.get('email')?.value;
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
}
