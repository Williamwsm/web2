import { Component, Input } from '@angular/core';
import { CandidatoBuscComponent } from "../candidato-busc/candidato-busc.component";

@Component({
  selector: 'app-buscar-cand',
  standalone: true,
  imports: [ CandidatoBuscComponent],
  templateUrl: './buscar-cand.component.html',
  styleUrl: './buscar-cand.component.css'
})
export class BuscarCandComponent {


}
