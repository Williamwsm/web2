import { Component } from '@angular/core';
import { FormUserComponent } from "../forms/form-user/form-user.component";
import { FormEmpComponent } from "../forms/form-emp/form-emp.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormUserComponent, FormEmpComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  tipoUsuario: 'candidato' | 'empresa' = "candidato"; // Estado inicial

  // Método para alternar entre os tipos de usuário
  selecionarTipo(tipo: 'candidato' | 'empresa') {
    this.tipoUsuario = tipo;
  }

}

