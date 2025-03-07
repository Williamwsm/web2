import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ApiService } from '../../../servicos/api.service';
import { log } from 'console';
import { Endereco } from '../../../model/endereco';
import { Candidato } from '../../../model/candidato';


@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [NgxMaskDirective, NgClass, ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
  providers: [provideNgxMask()]

})
export class FormUserComponent implements OnInit {

  meuFormulario: FormGroup;
  isCamposBloqueados : boolean = true;
  endereco:Endereco | null = null;

  @Output() formProntoEmiter = new EventEmitter<boolean>();
  @Output() formDadosEmiter = new EventEmitter<Candidato>();

  protected apiService = inject(ApiService);

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), Validators.email]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      logradouro: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      rua: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnInit(): void {
    this.meuFormulario.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.formProntoEmiter.emit(true);

        const formulario : Candidato={
            canTxCep:  this.meuFormulario.get('cep')!.value,
            canTxEmail:  this.meuFormulario.get('email')!.value,
            canTxCpf:  this.meuFormulario.get('cpf')!.value,
            canTxNome:  this.meuFormulario.get('nome')!.value,
            canTxSenha:  this.meuFormulario.get('senha')!.value,
            canTxLogradouro:  this.meuFormulario.get('logradouro')?.value,
            canTxRua:  this.meuFormulario.get('rua')?.value,
            cidNrId : this.endereco!.cidNrId,
            canTxCelular:  this.meuFormulario.get('telefone')?.value
        }

        this.formDadosEmiter.emit(formulario);
      } else {
        this.formProntoEmiter.emit(false);
      }
    });
  }

  protected buscarCep(event: any){
    let cep = event.target.value;

    cep = cep.replace(/\D/g, '');

    console.log(cep)
    if (cep.length === 8) {
      this.apiService.buscarEnderecoPorCep(cep).subscribe({
        next: (value) => {
          console.log(value.data);

          this.meuFormulario.patchValue({
            logradouro: value.data.endTxLogradouro,
            rua:value.data.endTxBairro
          });

          this.endereco = value.data;

          if (value.data.endTxLogradouro == null || value.data.endTxLogradouro.length ==0) {
            this.meuFormulario.get('rua')?.enable();
            this.meuFormulario.get('logradouro')?.enable();
            this.isCamposBloqueados = false;
          }else{
            this.meuFormulario.get('rua')?.disable();
            this.meuFormulario.get('logradouro')?.disable();
            this.isCamposBloqueados = true;
          }
        },
        error: (err) => {
          console.error('Erro ao buscar endereço:', err);
        }
      });
    }

  }
}
