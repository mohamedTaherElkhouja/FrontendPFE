import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../Service/admin-service';

export const authGuard: CanActivateFn = (route, state) => {
  const _Route = inject (Router);
  const AuthS = inject(AdminService)
  const admin = AuthS.getAdmin();

  if(sessionStorage.getItem('admin_key') && admin && admin._id) {
    return true;
  }
  else {
    _Route.navigate(['/admin/login']);
    return false;
  }
};
