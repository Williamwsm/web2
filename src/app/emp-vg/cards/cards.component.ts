import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  funcaoEmp: 'minhasVagas' | 'buscarCandidato'| 'candidaturas'| 'addVaga'= 'minhasVagas'
  selecionarFuncao(funcao: 'minhasVagas' | 'buscarCandidato'| 'candidaturas'| 'addVaga'){
    return this.funcaoEmp = funcao;
  }

}
