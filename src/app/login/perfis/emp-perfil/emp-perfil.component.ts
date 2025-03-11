import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MenuComponent } from "../../menu/menu/menu.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Endereco } from '../../../model/endereco';
import { ApiService } from '../../../servicos/api.service';
import { NgClass } from '@angular/common';
import { Empresa } from '../../../model/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-emp-perfil',
  standalone: true,
  imports: [MenuComponent, NgClass, ReactiveFormsModule],
  templateUrl: './emp-perfil.component.html',
  styleUrl: './emp-perfil.component.css'
})
export class EmpPerfilComponent implements OnInit {
  meuFormulario: FormGroup;
  isCamposBloqueados: boolean = true;
  endereco: Endereco | null = null;
  isLoad: boolean = false;
  empNrId: number | null = null;
  empresa!: Empresa;

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected apiService = inject(ApiService);
  toastService: ToastrService = inject(ToastrService);

  @Output() formProntoEmiter = new EventEmitter<boolean>();
  @Output() formDadosEmiter = new EventEmitter<Empresa>();

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      email: [{ value: '', disabled: true }],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cnpj: ['', [Validators.required, Validators.maxLength(14), Validators.minLength(14)]],
      logradouro: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      rua: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const empNrId = params.get('empNrId');
      if (empNrId) {
        this.buscarEmpresa(parseInt(empNrId));
        this.empNrId = parseInt(empNrId);
      }
    });

    this.meuFormulario.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.formProntoEmiter.emit(true);
        const formulario: Empresa = {
          empTxCep: this.meuFormulario.get('cep')!.value,
          empTxEmail: this.meuFormulario.get('email')!.value,
          empTxCnpj: this.meuFormulario.get('cnpj')!.value,
          empTxRazaoSocial: this.meuFormulario.get('razaoSocial')!.value,
          empTxLogradouro: this.meuFormulario.get('logradouro')?.value,
          empTxRua: this.meuFormulario.get('rua')?.value,
          cidNrId: this.endereco!.cidNrId,
          empTxTelefone: this.meuFormulario.get('telefone')?.value
        };
        this.formDadosEmiter.emit(formulario);
      } else {
        this.formProntoEmiter.emit(false);
      }
    });
  }

  submit() {
    if (this.empNrId) {
      this.atualizarEmpresa(this.empNrId);
    } else {
      this.cadastrarEmpresa();
    }
  }

  cadastrarEmpresa() {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.empresa = this.meuFormulario.value;
    this.isLoad = true;

    this.apiService.cadastrarEmpresa(this.empresa).subscribe({
      next: () => {
        this.toastService.success('Empresa cadastrada com sucesso!');
        this.meuFormulario.reset();
        this.isLoad = false;
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao cadastrar empresa.');
        this.isLoad = false;
      }
    });
  }

  atualizarEmpresa(empNrId: number) {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.empresa = this.meuFormulario.value;
    this.isLoad = true;

    this.apiService.atualizarEmpresa(empNrId, this.empresa).subscribe({
      next: () => {
        this.toastService.success('Empresa atualizada com sucesso!');
        this.router.navigate(['/dashboard']);
        this.isLoad = false;
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao atualizar empresa.');
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
