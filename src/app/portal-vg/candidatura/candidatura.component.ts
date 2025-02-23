import { Component } from '@angular/core';
import { DestaqueComponent } from "../../login/menu/destaque/destaque.component";
import { FiltrosComponent } from "./filtros/filtros.component";
import { CardVagasComponent } from "./card-vagas/card-vagas.component";
import { SuasCadidaturasComponent } from "./suas-cadidaturas/suas-cadidaturas.component";

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [DestaqueComponent, FiltrosComponent, CardVagasComponent, SuasCadidaturasComponent],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent {

}
