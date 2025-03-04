import { Component, Input } from '@angular/core';
import { VgCriadaPipe } from '../../../../vg-criada.pipe';
import { VgEncerramentoPipe } from '../../../../vg-encerramento.pipe';
import { VgAbertasComponent } from "../vg-abertas/vg-abertas.component";


@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
  imports: [VgCriadaPipe, VgEncerramentoPipe, VgAbertasComponent],
  templateUrl: './minhas-vagas.component.html',
  styleUrl: './minhas-vagas.component.css'
})
export class MinhasVagasComponent {

}
