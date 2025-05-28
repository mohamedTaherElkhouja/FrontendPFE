import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

export const authUserguardGuard: CanActivateFn = (route, state) => {
  const _Route = inject(Router);
  const AuthS = inject(AuthService)
  const user = AuthS.getUser();
  if(sessionStorage.getItem('key_user') && user && user._id) {
    return true;
  }
  else {
    _Route.navigate(['user/login']);
    return false;
  }

};
