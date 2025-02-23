import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-candidaturas',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './candidaturas.component.html',
  styleUrl: './candidaturas.component.css'
})
export class CandidaturasComponent {
@Input() nomeCandidato:string='';
@Input() cargo:string='';
}
