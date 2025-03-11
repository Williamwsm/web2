import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MenuComponent } from "../../menu/menu/menu.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Candidato } from '../../../model/candidato';
import { Endereco } from '../../../model/endereco';
import { ApiService } from '../../../servicos/api.service';
import { NgClass } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cand-perfil',
  standalone: true,
  imports: [MenuComponent, NgxMaskDirective, NgClass, ReactiveFormsModule],
  templateUrl: './cand-perfil.component.html',
  styleUrl: './cand-perfil.component.css',
  providers: [provideNgxMask()]
})
export class CandPerfilComponent implements OnInit {
  meuFormulario: FormGroup;
  isCamposBloqueados: boolean = true;
  endereco: Endereco | null = null;
  isEnable: boolean = false;
  isLoad: boolean = false;
  private router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  canNrId: number | null = null;
  candidato!: Candidato;
  toastService: ToastrService = inject(ToastrService);
  protected apiService = inject(ApiService);

  @Output() formProntoEmiter = new EventEmitter<boolean>();
  @Output() formDadosEmiter = new EventEmitter<Candidato>();

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      email: [{ value: '', disabled: true }],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      logradouro: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      rua: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const canNrId = params.get('canNrId');
      if (canNrId) {
        this.buscarCandidato(parseInt(canNrId));
        this.canNrId = parseInt(canNrId);
      }
    });

    this.meuFormulario.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.formProntoEmiter.emit(true);

        const formulario: Candidato = {
          canTxCep: this.meuFormulario.get('cep')!.value,
          canTxEmail: this.meuFormulario.get('email')!.value,
          canTxCpf: this.meuFormulario.get('cpf')!.value,
          canTxNome: this.meuFormulario.get('nome')!.value,
          canTxLogradouro: this.meuFormulario.get('logradouro')?.value,
          canTxRua: this.meuFormulario.get('rua')?.value,
          cidNrId: this.endereco!.cidNrId,
          canTxCelular: this.meuFormulario.get('telefone')?.value
        };

        this.formDadosEmiter.emit(formulario);
      } else {
        this.formProntoEmiter.emit(false);
      }
    });
  }

  submit() {
    if (this.canNrId) {
      this.atualizar(this.canNrId);
    } else {
      this.cadastrar();
    }
  }

  cadastrar() {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.candidato = this.meuFormulario.value;
    this.isLoad = true;

    this.apiService.cadastrarCandidato(this.candidato).subscribe({
      next: () => {
        this.toastService.success('Candidato cadastrado com sucesso!');
        this.meuFormulario.reset();
        this.isLoad = false;
        this.router.navigate(['/vagas']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao cadastrar candidato.');
        this.isLoad = false;
      }
    });
  }

  atualizar(canNrId: number) {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.candidato = this.meuFormulario.value;
    this.isLoad = true;

    this.apiService.atualizarCandidato(canNrId, this.candidato).subscribe({
      next: () => {
        this.toastService.success('Candidato atualizado com sucesso!');
        this.router.navigate(['/login']);
        this.isLoad = false;
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao atualizar candidato.');
        this.isLoad = false;
      }
    });
  }

  protected buscarCep(event: any) {
    let cep = event.target.value.replace(/\D/g, '');

    if (cep.length === 8) {
      this.apiService.buscarEnderecoPorCep(cep).subscribe({
        next: (value) => {
          this.meuFormulario.patchValue({
            logradouro: value.data.endTxLogradouro,
            rua: value.data.endTxBairro
          });

          this.endereco = value.data;

          if (!value.data.endTxLogradouro || value.data.endTxLogradouro.length === 0) {
            this.meuFormulario.get('rua')?.enable();
            this.meuFormulario.get('logradouro')?.enable();
            this.isCamposBloqueados = false;
          } else {
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
