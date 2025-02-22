import { Component } from '@angular/core';
import { MenuPerfilComponent } from "../../login/menu/menu-perfil/menu-perfil.component";

@Component({
  selector: 'app-menu-emp',
  standalone: true,
  imports: [MenuPerfilComponent],
  templateUrl: './menu-emp.component.html',
  styleUrl: './menu-emp.component.css'
})
export class MenuEmpComponent {

}
