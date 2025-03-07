import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu/menu.component";


@Component({
  selector: 'app-cand-perfil',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './cand-perfil.component.html',
  styleUrl: './cand-perfil.component.css'
})
export class CandPerfilComponent {
  cidade:string=''
  nome:string=''
  cpf:string=''
  rua ?:string=''
  cep:string=''
  logradouro ?:string=''
  email:string=''
  celular:string=''

}
