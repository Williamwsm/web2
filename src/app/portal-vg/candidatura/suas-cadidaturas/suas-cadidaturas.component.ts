import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suas-cadidaturas',
  standalone: true,
  imports: [],
  templateUrl: './suas-cadidaturas.component.html',
  styleUrl: './suas-cadidaturas.component.css'
})
export class SuasCadidaturasComponent {
  @Input() status:'Analise'|'Aprovado'= 'Analise';
  @Input() cargo: string = '';
  @Input() empresa: string ='';
  @Input() dataCandidatura:string='';

  getStatus(){
    return{
      'bg-green-100 text-green-800': this.status ==='Aprovado',
      'bg-blue-100 text-blue-800': this.status ==='Analise'
    };
  }
}
