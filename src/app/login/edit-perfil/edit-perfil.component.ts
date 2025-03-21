import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu/menu.component";
import { FormUserComponent } from "../forms/form-user/form-user.component";
import { FormEmpComponent } from "../forms/form-emp/form-emp.component";


@Component({
  selector: 'app-edit-perfil',
  standalone: true,
  imports: [MenuComponent, FormUserComponent, FormEmpComponent],
  templateUrl: './edit-perfil.component.html',
  styleUrl: './edit-perfil.component.css'
})
export class EditPerfilComponent {
  tipoUsuario: 'candidato' | 'empresa' = "candidato";

  selecionarTipo(tipo: 'candidato' | 'empresa') {
    this.tipoUsuario = tipo;
  }
}
