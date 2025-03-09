import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../../servicos/api.service';
import { Vaga } from '../../../model/vaga';

@Component({
  selector: 'app-suas-cadidaturas',
  standalone: true,
  imports: [],
  templateUrl: './suas-cadidaturas.component.html',
  styleUrl: './suas-cadidaturas.component.css'
})
export class SuasCadidaturasComponent {
  @Input() status:'Analise'|'Aprovado'= 'Analise';

  @Input() vaga : Vaga | null = null;
  apiService:ApiService = inject(ApiService);

  getStatus(){
    return{
      'bg-green-100 text-green-800': this.status ==='Aprovado',
      'bg-blue-100 text-blue-800': this.status ==='Analise'
    };
  }
}
