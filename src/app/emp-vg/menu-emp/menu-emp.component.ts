import { Component } from '@angular/core';
import { MenuPerfilComponent } from "../../login/menu/menu-perfil/menu-perfil.component";
import { MenuComponent } from "../../login/menu/menu/menu.component";

@Component({
  selector: 'app-menu-emp',
  standalone: true,
  imports: [MenuPerfilComponent, MenuComponent],
  templateUrl: './menu-emp.component.html',
  styleUrl: './menu-emp.component.css'
})
export class MenuEmpComponent {

}
