import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-utilisateur',
  templateUrl: './login-utilisateur.component.html',
  styleUrls: ['./login-utilisateur.component.scss']
})
export class LoginUtilisateurComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.loginUser(email, password).subscribe(
        (res: any) => {
          if (res.success) {
            this.toastr.success('Welcome back!', 'Login Successful');
  
            this.authService.save_user(res);
  
            switch (res.user.role) {
              case 'Emetteur':
                this.router.navigate(['/emetteur']);
                break;
              case 'AQ':
                this.router.navigate(['/user/AQ']);
                break;
              case 'HSE':
                this.router.navigate(['/user/HSE']);
                break;
            }
          } else {
            this.toastr.error(res.message || 'Login failed', 'Error');
          }
        },
        (err) => {
          console.error(err);
          this.toastr.error(err.error?.message || 'Server error', 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields correctly', 'Validation Error');
    }
  }
  
}