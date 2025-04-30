import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from 'src/app/Service/admin-service.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  loginForm : FormGroup;
 constructor ( private adminService : AdminServiceService , private route : Router , 
  private tosrt : ToastrService , private fb : FormBuilder){ 
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
 } 

 login(){
  if(this.loginForm.valid){
    const {email , password} = this.loginForm.value;
    this.adminService.login(email , password).subscribe(
      (res : any) => {
        if(res.success){
          this.tosrt.success('Welcome back!', 'Login Successful');
          this.adminService.saveAdmin(res);
          this.route.navigate(['/admin/dashboard']);
        }else{
          this.tosrt.error('Invalid email or password', 'Login Failed');
        }
      },
      (error) => {
        console.error(error);
        this.tosrt.error('An error occurred during login', 'Login Failed');
      }
    );
  }else{
    this.tosrt.error('Please fill in all fields', 'Login Failed');
  }
 }
}
