import { Injectable, OnInit, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { log } from 'console';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { LocalStorageService } from './local-storage.service';
import { Login } from '../../model/login';

interface DecodedToken extends JwtPayload {
  sub: string;
  role: string;
  curNrId:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  private router: Router = inject(Router);
  private apiService: ApiService = inject(ApiService);
  private toastService: ToastrService = inject(ToastrService)

  private localStorageService: LocalStorageService = inject(LocalStorageService)


  setAcessToken(acessToken: string): void {

    const decode: DecodedToken = jwtDecode(acessToken);

    this.localStorageService.setItemForLocalStorage("acessToken", acessToken)


  }
  getAcessToken(): string | null {
    const token: string | null = this.localStorageService.getItemForLocalStorage("acessToken")
    return token;
  }

  setCurNrId(curNrId:string){
        this.localStorageService.setItemForLocalStorage("curNrId", curNrId);
  }

  getCurNrId() : string | null{
    return this.localStorageService.getItemForLocalStorage("curNrId");
}


  login(userLogin: Login): void {
    this.apiService.login(userLogin).subscribe({
      next: (value) => {

        this.setAcessToken(value.data);
        const decode: DecodedToken = jwtDecode(value.data);

       this.setCurNrId(decode.curNrId);

        if (decode.role == 'Usuario') {
          this.navigateToVagas()
        } else if (decode.role == 'Administrador') {
          this.navigateToEmpresa();
        } else {
          this.toastService.error("Não foi possível reconhecer perfil")
        }

      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.toastService.error(e.error.message)
      }
    })
  }

  navigateToVagas(): void {
    this.router.navigate(['/vagas'])
  }

  navigateToEmpresa(): void {
    this.router.navigate(['/empresa'])
  }

}
