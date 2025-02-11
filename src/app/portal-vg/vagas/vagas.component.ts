import { Component } from '@angular/core';
import { MenuPricipalComponent } from "../menu-pricipal/menu-pricipal.component";
import { CandidaturaComponent } from "../candidatura/candidatura.component";


@Component({
  selector: 'app-vagas',
  standalone: true,
  imports: [MenuPricipalComponent, CandidaturaComponent],
  templateUrl: './vagas.component.html',
  styleUrl: './vagas.component.css'
})
export class VagasComponent {

}
