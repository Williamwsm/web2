import { Component, inject, OnInit } from '@angular/core';
import { MenuPricipalComponent } from "../menu-pricipal/menu-pricipal.component";
import { CandidaturaComponent } from "../candidatura/candidatura.component";
import { ApiService } from '../../servicos/api.service';
import { Vaga } from '../../model/vaga';


@Component({
  selector: 'app-vagas',
  standalone: true,
  imports: [MenuPricipalComponent, CandidaturaComponent],
  templateUrl: './vagas.component.html',
  styleUrl: './vagas.component.css'
})
export class VagasComponent{


}
