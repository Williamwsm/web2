import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../servicos/auth/authentication-service.service';



export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthenticationService)
  if(authService.getAcessToken()){
    return true;
  }else{
    return inject(Router).createUrlTree(["/"])
  }
};
