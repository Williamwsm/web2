import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './minhas-vagas.component.html',
  styleUrl: './minhas-vagas.component.css'
})
export class MinhasVagasComponent {
@Input() cargo:string='';
@Input() tipoVaga:string='';
@Input() numeroHoras:string='';
@Input() numeroCandidaturas:string='';
@Input() descricaoVaga:string='';
}
