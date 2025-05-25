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
  loginForm: FormGroup;

  constructor(
    private adminService: AdminServiceService,
    private route: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.adminService.login(email, password).subscribe(
        (res: any) => {
          if (res.success && res.admin) {
            this.toastr.success('Welcome back!', 'Login Successful');
            this.adminService.saveAdmin(res.admin); // Save only the admin object
            this.route.navigate(['/admin/dashboard']);
          } else {
            this.toastr.error('Invalid email or password', 'Login Failed');
          }
        },
        (error) => {
          console.error(error);
          this.toastr.error('An error occurred during login', 'Login Failed');
        }
      );
    } else {
      this.toastr.error('Please fill in all fields', 'Login Failed');
    }
  }
}
