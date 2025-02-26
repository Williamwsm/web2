import { Component } from '@angular/core';
import { MenuPerfilComponent } from "../../login/menu/menu-perfil/menu-perfil.component";
import { MenuComponent } from "../../login/menu/menu/menu.component";

@Component({
  selector: 'app-menu-pricipal',
  standalone: true,
  imports: [MenuPerfilComponent, MenuComponent],
  templateUrl: './menu-pricipal.component.html',
  styleUrl: './menu-pricipal.component.css'
})
export class MenuPricipalComponent {

}
