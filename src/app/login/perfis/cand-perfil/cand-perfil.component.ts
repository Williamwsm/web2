import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MenuComponent } from "../../menu/menu/menu.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Candidato } from '../../../model/candidato';
import { Endereco } from '../../../model/endereco';
import { ApiService } from '../../../servicos/api.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-cand-perfil',
  standalone: true,
  imports: [MenuComponent , NgClass, ReactiveFormsModule],
  templateUrl: './cand-perfil.component.html',
  styleUrl: './cand-perfil.component.css'
})
export class CandPerfilComponent {
  meuFormulario: FormGroup;
    isCamposBloqueados : boolean = true;
    endereco:Endereco | null = null;

    @Output() formProntoEmiter = new EventEmitter<boolean>();
    @Output() formDadosEmiter = new EventEmitter<Candidato>();

    protected apiService = inject(ApiService);

    constructor(private fb: FormBuilder) {
      this.meuFormulario = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
        email: [{ value: '', disabled: true }],
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
