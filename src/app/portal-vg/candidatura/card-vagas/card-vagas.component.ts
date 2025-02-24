import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-vagas',
  standalone: true,
  imports: [],
  templateUrl: './card-vagas.component.html',
  styleUrl: './card-vagas.component.css'
})
export class CardVagasComponent {
  @Input() empresa: string = '';
  @Input() cargo: string='';
  @Input() tipoVaga :string='';
  @Input() vagaLocacao:string='';
  @Input() horasTrabalho:string='';
  @Input() tecnologia:string='';
  @Input() vagaDescricao:string = '';
}
