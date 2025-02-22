import { Component } from '@angular/core';
import { MenuPerfilComponent } from "../../login/menu/menu-perfil/menu-perfil.component";

@Component({
  selector: 'app-menu-pricipal',
  standalone: true,
  imports: [MenuPerfilComponent],
  templateUrl: './menu-pricipal.component.html',
  styleUrl: './menu-pricipal.component.css'
})
export class MenuPricipalComponent {

}
