import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../servicos/auth/authentication-service.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  role: string;
}

export const authEmpresaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService)
  const token: string | null = authService.getAcessToken();

  if (token) {

    const decode: DecodedToken = jwtDecode(token);
    if (decode.role != 'Administrador') {
      return false;
    }
    return true
  } else {
    return inject(Router).createUrlTree(["/login"])
  }
};
