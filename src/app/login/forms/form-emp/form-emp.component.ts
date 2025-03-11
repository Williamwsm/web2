import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ApiService } from '../../../servicos/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Empresa } from '../../../model/empresa';
import { Vaga } from '../../../model/vaga';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadComponent } from '../../../components/load/load.component';

@Component({
  selector: 'app-form-emp',
  standalone: true,
  imports: [NgxMaskDirective, ReactiveFormsModule, NgClass, LoadComponent],
  templateUrl: './form-emp.component.html',
  styleUrl: './form-emp.component.css',
  providers: [provideNgxMask()]

})
export class FormEmpComponent implements OnInit{
  protected apiService: ApiService = inject(ApiService);
  toastService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected empresa!: Empresa;
  protected vaga!: Vaga;
  isload:boolean = false;
  meuFormularioEmpresa: FormGroup;
  meuFormularioVaga: FormGroup;
  empNrId: number | null = null;
  vagNrId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.meuFormularioEmpresa = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      empTxRazaoSocial: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      empTxEmail: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      empTxNumero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      empTxRua: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      empTxLogradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });

    this.meuFormularioVaga = this.fb.group({
      vagTxTitulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
      vagTxDescricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]], 
      vagTxRequisitos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      vagNrQuantidade: [1, [Validators.required, Validators.min(1)]], 
      vagDtLimite: ['', [Validators.required]], 
      vagTxModalidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
      vagTxTipo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
      vagTxFormacao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
      vagTxExperiencia: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]], 
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
  }

  submit() {
    if (this.empNrId) {
      this.atualizarEmpresa(this.empNrId);
    } else {
      this.cadastrarEmpresa();
    }
  }

  cadastrarEmpresa() {
    if (this.meuFormularioEmpresa.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.empresa = this.meuFormularioEmpresa.value;
    this.isload = true;

    this.apiService.cadastrarEmpresa(this.empresa)
    .subscribe({
      next: () => {
        this.toastService.success('Empresa cadastrada com sucesso!');
        this.meuFormularioEmpresa.reset();
        this.isload = false;
        this.router.navigate(['/empresas']);
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao cadastrar empresa.');
        this.isload = false;
      }
    });
  }

    atualizarEmpresa(empNrId: number) {
      if (this.meuFormularioEmpresa.invalid) {
        this.toastService.error('Preencha todos os campos obrigatórios!');
        return;
      }
  
      this.empresa = this.meuFormularioEmpresa.value;
      this.isload = true;
      this.apiService.atualizarEmpresa(empNrId, this.empresa)
      .subscribe({
        next: () => {
          this.toastService.success('Empresa atualizada com sucesso!');
          this.meuFormularioEmpresa.reset();
          this.isload = false;
          this.router.navigate(['/empresas']);
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message || 'Erro ao atualizar empresa.');
          this.isload = false;
        }
      });
    }

    buscarEmpresa(empNrId: number) {
      this.apiService.buscarEmpresa(empNrId)
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.meuFormularioEmpresa.patchValue(this.empresa);
            this.toastService.success('Empresa carregada com sucesso!');
          } else {
            this.toastService.error('Nenhuma empresa encontrada.');
          }
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message || 'Erro ao buscar empresa.');
        }
      });
    }

    cadastrarVaga() {
      if (this.meuFormularioVaga.invalid) {
        this.toastService.error('Preencha todos os campos obrigatórios!');
        return;
      }
  
      this.vaga = this.meuFormularioVaga.value;
      this.isload = true;
      this.apiService.cadastrarVaga(this.vaga)
      .subscribe({
        next: () => {
          this.toastService.success('Vaga cadastrada com sucesso!');
          this.meuFormularioVaga.reset();
          this.isload = false;
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message || 'Erro ao cadastrar vaga.');
          this.isload = false;
        }
      });
    }
  
    atualizarVaga(vagNrId: number) {
      if (this.meuFormularioVaga.invalid) {
        this.toastService.error('Preencha todos os campos obrigatórios!');
        return;
      }
  
      this.vaga = this.meuFormularioVaga.value;
      this.isload = true;
      this.apiService.atualizarVaga(vagNrId, this.vaga)
      .subscribe({
        next: () => {
          this.toastService.success('Vaga atualizada com sucesso!');
          this.isload = false;
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message || 'Erro ao atualizar vaga.');
          this.isload = false;
        }
      });
    }
  }