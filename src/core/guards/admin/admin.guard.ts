import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../app/services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authSer = inject(AuthService);

  if(authSer.isAdmin){
     return true;
  }else{
    router.navigateByUrl('/');
    return false;
  }
};
