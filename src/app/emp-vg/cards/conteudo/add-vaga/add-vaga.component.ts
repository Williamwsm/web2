import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCriadaPipe } from '../../../../vg-criada.pipe';
import { VgEncerramentoPipe } from '../../../../vg-encerramento.pipe';
import { ExperienciaEnum, FormacaoEnum, ModalidadeEnum, TipoVagaEnum } from '../../../../model/enuns/vaga';
import { NgClass } from '@angular/common';
import { Vaga } from '../../../../model/vaga';
import { ApiService } from '../../../../servicos/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadComponent } from "../../../../components/load/load.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-vaga',
  standalone: true,
  imports: [MatIconModule, FormsModule, ReactiveFormsModule, NgClass, LoadComponent],
  templateUrl: './add-vaga.component.html',
  styleUrl: './add-vaga.component.css'
})
export class AddVagaComponent implements OnInit {
  protected meuFormulario: FormGroup;
  protected tipoVagas = Object.values(TipoVagaEnum);
  protected niveisEnsino = Object.values(FormacaoEnum);
  protected niveisExPeriencia = Object.values(ExperienciaEnum);
  protected modalidades = Object.values(ModalidadeEnum);
  protected minDate: string;
  protected maxDate: string;
  protected vaga!:Vaga;
  protected api:ApiService = inject(ApiService);
  protected toast:ToastrService = inject(ToastrService)
  isload:boolean = false;
  vagNrId:number | null = null;
  @Input() vagaForm:Vaga | null = null;
    private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      VagTxModalidade: [null, [Validators.required]],
      vagTxTipo: [null, [Validators.required]],
      vagTxExperiencia: [null, [Validators.required]],
      VagTxTitulo: ['', [Validators.minLength(5), Validators.maxLength(256), Validators.required]],
      VagNrQuantidade: [1, [Validators.min(1), Validators.max(50), Validators.required]],
      VagTxFormacao: [null, [Validators.required]],
      VagTxDescricao: ['', [Validators.minLength(5), Validators.maxLength(800), Validators.required]],
      VagTxRequisitos: ['', [Validators.minLength(5), Validators.maxLength(600), Validators.required]],
      VagNrCargaHorariaSemanal: [1],
      VagaDtLimite: ['', [Validators.required]],
    });

    const today = new Date();
    this.minDate = this.formatDate(today);

    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1); // Adiciona 1 mês
    this.maxDate = this.formatDate(maxDate);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const vagNrId = params.get('vagNrId');
      if(vagNrId!=null){
        this.vagNrId = parseInt(vagNrId as string);
      }
      if (vagNrId) {
        this.api.buscarVagaDaEmpresa(parseInt(vagNrId))
        .subscribe(
          {
            next:(value)=>{
              this.meuFormulario.get("VagTxModalidade")?.patchValue(value.data.vagTxModalidade);
              this.meuFormulario.get("vagTxTipo")?.patchValue(value.data.vagTxTipo);
              this.meuFormulario.get("vagTxExperiencia")?.patchValue(value.data.vagTxExperiencia);
              this.meuFormulario.get("VagNrQuantidade")?.patchValue(value.data.vagNrQuantidade);
              this.meuFormulario.get("VagTxFormacao")?.patchValue(value.data.vagTxFormacao);
              this.meuFormulario.get("VagTxDescricao")?.patchValue(value.data.vagTxDescricao);
              this.meuFormulario.get("VagTxRequisitos")?.patchValue(value.data.vagTxRequisitos);
              this.meuFormulario.get("VagTxTitulo")?.patchValue(value.data.vagTxTitulo);
              this.meuFormulario.get("VagNrCargaHorariaSemanal")?.patchValue(value.data.vagNrCargaHoraria);
              this.meuFormulario.get("VagaDtLimite")?.patchValue(value.data.vagDtLimite);
            }
          }
        )
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vagaForm'] && this.vagaForm) {
     console.log(this.vagaForm);
      setTimeout(()=> this.meuFormulario.patchValue(this.vagaForm!),1000)
      ;
    }
  }


  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  submit(){


    this.isload = true;
    this.vaga = this.meuFormulario.value;
    if (this.vagNrId) {
      this.api.atualizarVaga(this.vagNrId, this.vaga)
      .subscribe({
        next:(value) =>{
          this.toast.success("Vaga atualizada com sucesso");
          this.isload = false
        }
      })
    } else {
      setTimeout(() => {


        this.api.cadastrarVaga(this.vaga)
        .subscribe({
          next:(value)=>{
            this.toast.success("Vaga cadastrada com sucesso")
            this.isload = false;
          },
          error:(e:HttpErrorResponse)=>{
            this.toast.error(e.error.message)
            this.isload = false;
          }
        })
       }, 1000);
    }


  }
}
