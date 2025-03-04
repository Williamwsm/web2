import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-meus-candidatos',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './meus-candidatos.component.html',
  styleUrl: './meus-candidatos.component.css'
})
export class MeusCandidatosComponent {
  @Input() nomeCandidato:string='';
  @Input() cargo:string='';
}
