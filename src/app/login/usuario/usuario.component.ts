import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
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

