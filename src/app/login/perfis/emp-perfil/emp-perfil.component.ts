import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu/menu.component";

@Component({
  selector: 'app-emp-perfil',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './emp-perfil.component.html',
  styleUrl: './emp-perfil.component.css'
})
export class EmpPerfilComponent {
  cidade:string=''
  cnpj:string =''
  razaoSocial:string=''
  telefone:string=''
  rua ?:string=''
  cep:string=''
  logradouro ?:string=''
  email:string=''


}
