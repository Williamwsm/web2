import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Cidade, Estado } from '../../../model/estado';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ApiService } from '../../../servicos/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ExperienciaEnum, TipoVagaEnum } from '../../../model/enuns/vaga';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {

  isHibrido: boolean = false;
  isPresencial: boolean = false;
  isRemoto: boolean = false;
  selectedExperiencia: ExperienciaEnum | undefined = undefined;
  cidades!: Cidade[];
  estadoSelecionado: number | null = null;
  cidadesSelecionada: number | null = null;
  tipoVagaSelecionado:TipoVagaEnum | undefined = undefined;
  toastService:ToastrService = inject(ToastrService)
  experiencias : ExperienciaEnum[] =  Object.values(ExperienciaEnum);
  tiposVagas:TipoVagaEnum[] =  Object.values(TipoVagaEnum);

  @Output() remotoChange = new EventEmitter<boolean>();
  @Output() hibridoChange = new EventEmitter<boolean>();
  @Output() presencialChange = new EventEmitter<boolean>();
  @Output() estadoChange = new EventEmitter<number>();
  @Output() cidadeChange = new EventEmitter<number>();
  @Output() experienciaChange = new EventEmitter<ExperienciaEnum | undefined>();
  @Output() tipoVagaChange = new EventEmitter<TipoVagaEnum | undefined>();

  @Input() estados!: Estado[];
  @Input() quantidadeVagas:number = 0;


  protected apiService: ApiService = inject(ApiService)

  handleRemoto() {
    this.isRemoto = !this.isRemoto;
    this.remotoChange.emit(this.isRemoto);
  }

  handleHibrido() {
    this.isHibrido = !this.isHibrido
    this.hibridoChange.emit(this.isHibrido);
  }

  handlePresencial() {
    this.isPresencial = !this.isPresencial
    this.presencialChange.emit(this.isPresencial);
  }

  onEstadoChange() {
    this.estadoChange.emit(this.estadoSelecionado!);
    this.apiService.buscarCidadeComBaseNoEstado(this.estadoSelecionado!)
      .subscribe({
        next: (value) => {
          this.cidades = value.data;
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message)
        },
      });
  }
  onCidadeChange(){
    this.cidadeChange.emit(this.cidadesSelecionada!);
  }

  onExperienciaChange(experiencia:ExperienciaEnum){
    this.selectedExperiencia = experiencia == this.selectedExperiencia ? undefined : experiencia
    this.experienciaChange.emit(this.selectedExperiencia);
  }

  onTipoVagaChange(){
    this.tipoVagaChange.emit(this.tipoVagaSelecionado);
  }

}
