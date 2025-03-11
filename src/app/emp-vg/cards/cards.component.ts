import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MinhasVagasComponent } from "./conteudo/minhas-vagas/minhas-vagas.component";
import { CandidaturasComponent } from "./conteudo/candidaturas/candidaturas.component";
import { BuscarCandComponent } from "./conteudo/buscar-cand/buscar-cand.component";
import { AddVagaComponent } from "./conteudo/add-vaga/add-vaga.component";
import { ApiService } from '../../servicos/api.service';
import { Vaga } from '../../model/vaga';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { EmptyComponent } from '../../components/empty/empty.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatIconModule, MinhasVagasComponent, CandidaturasComponent, EmptyComponent, RouterOutlet, RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  funcaoEmp: 'minhasVagas' | 'buscarCandidato'| 'candidaturas'| 'addVaga'= 'minhasVagas'
  selecionarFuncao(funcao: 'minhasVagas' | 'buscarCandidato'| 'candidaturas'| 'addVaga'){
    return this.funcaoEmp = funcao;
  }


}
