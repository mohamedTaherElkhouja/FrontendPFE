import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../Service/admin-service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.adminService.loginadmin(email, password).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastr.success('Welcome back, Admin!', 'Login Successful');
          this.adminService.save_admin(res);

          // Redirection après connexion réussie (admin)
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.toastr.error(res.message || 'Login failed', 'Error');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.toastr.error(err.error?.message || 'Server error', 'Error');
      },
    });
  }
}
