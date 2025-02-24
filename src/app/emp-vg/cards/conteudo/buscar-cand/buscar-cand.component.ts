import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-buscar-cand',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './buscar-cand.component.html',
  styleUrl: './buscar-cand.component.css'
})
export class BuscarCandComponent {
@Input() nomeCandidato:string='';
@Input() cargo:string='';
@Input() tecnologia:string='';
@Input() Localizacao:string='';
@Input() vagaLocacao:string='';


}
