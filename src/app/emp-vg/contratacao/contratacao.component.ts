import { Component } from '@angular/core';
import { MenuPricipalComponent } from "../../portal-vg/menu-pricipal/menu-pricipal.component";
import { MenuEmpComponent } from "../menu-emp/menu-emp.component";
import { CardsComponent } from "../cards/cards.component";

@Component({
  selector: 'app-contratacao',
  standalone: true,
  imports: [MenuPricipalComponent, MenuEmpComponent, CardsComponent],
  templateUrl: './contratacao.component.html',
  styleUrl: './contratacao.component.css'
})
export class ContratacaoComponent {

}
