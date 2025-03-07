import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../servicos/auth/authentication-service.service';
import { Login } from '../../model/login';
import { NgClass } from '@angular/common';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [RouterLink, ReactiveFormsModule, NgClass]
})
export default class LoginComponent {

  userLogin!:Login;

  fb:FormBuilder = inject(FormBuilder)


  toastService:ToastrService = inject(ToastrService)

  // protected mail = faEnvelope

  // protected lock = faLock

  authService:AuthenticationService = inject(AuthenticationService)

  protected loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]]
  })

  protected login():void{

    this.userLogin ={
      usuTxEmail:this.loginForm.value.email ?? '',
      usuTxSenha: this.loginForm.value.password ?? ''
    }

    this.authService.login(this.userLogin)
  }

}
