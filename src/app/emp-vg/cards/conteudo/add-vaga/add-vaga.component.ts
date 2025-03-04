import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { VgCriadaPipe } from '../../../../vg-criada.pipe';
import { VgEncerramentoPipe } from '../../../../vg-encerramento.pipe';

@Component({
  selector: 'app-add-vaga',
  standalone: true,
  imports: [MatIconModule, FormsModule, VgCriadaPipe, VgEncerramentoPipe],
  templateUrl: './add-vaga.component.html',
  styleUrl: './add-vaga.component.css'
})
export class AddVagaComponent {
  descricao:string='';
  titulo:string='';
  beneficios:string='';
  requisitos:string='';
  localizacao:string='';
  nEnsino:string='';
  formacao:string='';

}
