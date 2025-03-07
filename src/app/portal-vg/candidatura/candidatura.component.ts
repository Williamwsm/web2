import { Component, inject, OnInit } from '@angular/core';
import { DestaqueComponent } from "../../login/menu/destaque/destaque.component";
import { FiltrosComponent } from "./filtros/filtros.component";
import { CardVagasComponent } from "./card-vagas/card-vagas.component";
import { SuasCadidaturasComponent } from "./suas-cadidaturas/suas-cadidaturas.component";
import { ApiService } from '../../servicos/api.service';
import { Vaga } from '../../model/vaga';

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [DestaqueComponent, FiltrosComponent, CardVagasComponent, SuasCadidaturasComponent],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent implements OnInit{

  private apiService:ApiService = inject(ApiService);
  protected vagas:Vaga[] = []

  ngOnInit(): void {
    this.apiService.buscarVagas().subscribe({
      next: (response) => {
        console.log(response); // Aqui você pode acessar os dados da resposta, como "response.data"
        this.vagas = response.data.items
      },
      error: (err) => {
        console.error('Erro ao buscar vagas:', err);
      },
      complete: () => {
        console.log('Requisição concluída');
      }
    });


  }

}
