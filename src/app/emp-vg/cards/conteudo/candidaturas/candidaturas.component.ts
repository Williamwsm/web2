import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MeusCandidatosComponent } from "../meus-candidatos/meus-candidatos.component";

@Component({
  selector: 'app-candidaturas',
  standalone: true,
  imports: [MatIconModule, MeusCandidatosComponent],
  templateUrl: './candidaturas.component.html',
  styleUrl: './candidaturas.component.css'
})
export class CandidaturasComponent {

}
