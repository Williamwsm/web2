import { Component } from '@angular/core';
import { DestaqueComponent } from "../../login/menu/destaque/destaque.component";

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [DestaqueComponent],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent {
  statusUser:'Analise'|'Aprovado'= 'Analise';

}
