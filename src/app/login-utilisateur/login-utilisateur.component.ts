import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-utilisateur',
  templateUrl: './login-utilisateur.component.html',
  styleUrls: ['./login-utilisateur.component.scss']
})
export class LoginUtilisateurComponent {
  form = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.loginUser(email, password).subscribe(
      (res: any) => {
        if (res.success) {
          console.log('Login successful');

          this.authService.save_user(res)
          console.log(res)
          if (res.user.role==='Emetteur'){
            this.router.navigate(["user/emetteur"])
          }
          else if (res.user.role==='AQ'){
            this.router.navigate(["user/AQ"])
          }
          else if (res.user.role==='HSE'){
            this.router.navigate(["user/HSE"])
          }
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
      },
      (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Server error';
      }
    );
  }
}
