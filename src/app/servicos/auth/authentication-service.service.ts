import { Injectable, inject } from '@angular/core';
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
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private user:string | null=null

  private router:Router = inject(Router);
  private apiService:ApiService = inject(ApiService);
  private toastService:ToastrService = inject(ToastrService)

  private localStorageService:LocalStorageService = inject(LocalStorageService)


  setUser(user:string):void{
    this.localStorageService.setItemForLocalStorage("user", JSON.stringify(user))
  }

  getUser():string | null{

    const user:string | null=localStorage.getItem("user");

    if(user){
      this.user=JSON.parse(user);
    }else{
      this.user=null;
    }

    return this.user;

  }

  setAcessToken(acessToken:string):void{

    const decode:DecodedToken=jwtDecode(acessToken);

    console.log(decode)

    this.setUser(decode.sub)

    this.localStorageService.setItemForLocalStorage("acessToken", acessToken)


  }
  getAcessToken():string|null{
    const token:string|null=this.localStorageService.getItemForLocalStorage("acessToken")
    return token ;
  }


  login(userLogin:Login):void{
    this.apiService.login(userLogin).subscribe({
      next:(value)=>{

        this.setAcessToken(value.data);
        this.navigateToVagas()

      },
      error:(e:HttpErrorResponse)=>{
        console.log(e);
        this.toastService.error(e.error.message)
      }
    })
  }

  navigateToVagas():void{
    this.router.navigate(['/vagas'])
  }

}
