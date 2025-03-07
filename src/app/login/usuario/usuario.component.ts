import { Component, inject } from '@angular/core';
import { FormUserComponent } from "../forms/form-user/form-user.component";
import { FormEmpComponent } from "../forms/form-emp/form-emp.component";
import { NgClass } from '@angular/common';
import { Candidato } from '../../model/candidato';
import { ApiService } from '../../servicos/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormUserComponent, FormEmpComponent, NgClass],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  isEnable: boolean =  false;
  private apiService = inject(ApiService);
  private router : Router = inject(Router);

  tipoUsuario: 'candidato' | 'empresa' = "candidato"; // Estado inicial

  protected candidato!: Candidato;
  toastService:ToastrService = inject(ToastrService);

  gerenciarEnable(isEnable: boolean) {
    this.isEnable = isEnable;
  }

  AdicionarCandidato(candidato:Candidato){
    this.candidato = candidato;
  }

  submit() {

    this.apiService.cadasTrarCandidato(this.candidato)
      .subscribe({
        next: (value) => {
          // Processar o valor da resposta
          alert("Candidato cadastrado com sucesso")
          this.toastService.success("Candidato cadastrado com sucesso")
          this.router.navigate(['/login']);
        },
        error: (e:HttpErrorResponse) => {
          // Lidar com o erro
          alert(e.error.message)
          this.toastService.success(e.error.message)
        }
      });
  }


  // Método para alternar entre os tipos de usuário
  selecionarTipo(tipo: 'candidato' | 'empresa') {
    this.tipoUsuario = tipo;
  }

}

