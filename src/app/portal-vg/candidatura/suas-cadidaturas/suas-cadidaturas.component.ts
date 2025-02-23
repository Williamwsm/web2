import { Component } from '@angular/core';

@Component({
  selector: 'app-suas-cadidaturas',
  standalone: true,
  imports: [],
  templateUrl: './suas-cadidaturas.component.html',
  styleUrl: './suas-cadidaturas.component.css'
})
export class SuasCadidaturasComponent {
  statusUser:'Analise'|'Aprovado'= 'Analise';

}
