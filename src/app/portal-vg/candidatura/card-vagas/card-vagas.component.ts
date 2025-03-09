import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Vaga } from '../../../model/vaga';
import { DatePipe, NgClass } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DiferendayPipe } from '../../../pipes/diferenday.pipe';
import { ApiService } from '../../../servicos/api.service';
import { ConfirmarVagaComponent } from '../../../components/confirmar-vaga/confirmar-vaga.component';
import { AddVagaComponent } from "../../../emp-vg/cards/conteudo/add-vaga/add-vaga.component";

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-card-vagas',
  standalone: true,
  imports: [DatePipe, DiferendayPipe, NgClass],
  templateUrl: './card-vagas.component.html',
  styleUrl: './card-vagas.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class CardVagasComponent {
  @Input() vaga!: Vaga

   @Output() changeVaga = new EventEmitter<Vaga>();

   onChangeVaga(){
    this.changeVaga.emit(this.vaga)
   }
}
