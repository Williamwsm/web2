import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-candidato-busc',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './candidato-busc.component.html',
  styleUrl: './candidato-busc.component.css'
})
export class CandidatoBuscComponent {
@Input() nomeCandidato:string='';
@Input() cargo:string='';
@Input() tecnologia:string='';
@Input() Localizacao:string='';
@Input() vagaLocacao:string='';
}
