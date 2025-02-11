import { Component } from '@angular/core';
import { MenuBarComponent } from "../menu/menu-bar/menu-bar.component";
import { DestaqueComponent } from "../menu/destaque/destaque.component";
import { CardComponent } from "../menu/card/card.component";
import { UsuarioComponent } from "../usuario/usuario.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuBarComponent, DestaqueComponent, CardComponent, UsuarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
