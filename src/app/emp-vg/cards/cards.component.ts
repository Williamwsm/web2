import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MinhasVagasComponent } from "./conteudo/minhas-vagas/minhas-vagas.component";
import { CandidaturasComponent } from "./conteudo/candidaturas/candidaturas.component";
import { BuscarCandComponent } from "./conteudo/buscar-cand/buscar-cand.component";
import { AddVagaComponent } from "./conteudo/add-vaga/add-vaga.component";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatIconModule, MinhasVagasComponent, CandidaturasComponent, BuscarCandComponent, AddVagaComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  funcaoEmp: 'minhasVagas' | 'buscarCandidato'| 'candidaturas'| 'addVaga'= 'minhasVagas'
  selecionarFuncao(funcao: 'minhasVagas' | 'buscarCandidato'| 'candidaturas'| 'addVaga'){
    return this.funcaoEmp = funcao;
  }

}
