import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu/menu.component";

@Component({
  selector: 'app-edit-perfil',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './edit-perfil.component.html',
  styleUrl: './edit-perfil.component.css'
})
export class EditPerfilComponent {
  tipoUsuario: 'candidato' | 'empresa' = "candidato";

  selecionarTipo(tipo: 'candidato' | 'empresa') {
    this.tipoUsuario = tipo;
  }
}
