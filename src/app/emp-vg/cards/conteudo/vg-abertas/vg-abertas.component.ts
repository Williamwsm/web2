import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vg-abertas',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './vg-abertas.component.html',
  styleUrl: './vg-abertas.component.css'
})
export class VgAbertasComponent {
@Input() cargo:string='';
@Input() tipoVaga:string='';
@Input() numeroHoras:string='';
@Input() numeroCandidaturas:string='';
@Input() descricaoVaga:string='';
}
