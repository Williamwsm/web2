import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { count, error, log } from 'console';
import { catchError, delay, retry, throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../servicos/auth/authentication-service.service';
import { ToastrService } from 'ngx-toastr';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {


  const authService: AuthenticationService = inject(AuthenticationService);

  const toastService: ToastrService = inject(ToastrService)


  const token = authService.getAcessToken();

  // const router= inject(Router)


  if (token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })


  }

  console.log(req)


  return next(req).pipe(

    // retry({ count: 2, delay: 1000 }),

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 0: {


          // toastService.error("Ops! Parece que você está sem internet");

          console.log(error);


          break;

        }

        case 500:{
          // toastService.error("Ops! Algo inesperado aconteceu");
          break;
        }

        case 403:{
          // sessionStorage.clear()
          // router.navigate([''])
        }
      }

      return throwError(() => error)
    })
  );
};
