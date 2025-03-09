import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../login/menu/menu/menu.component';
import { ApiService } from '../../servicos/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Curriculo } from '../../model/curriculo';

@Component({
  selector: 'app-form-curriculo',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './form-curriculo.component.html',
  styleUrl: './form-curriculo.component.css'
})

export class FormCurriculoComponent {
  protected apiService: ApiService = inject(ApiService);
  toastService: ToastrService = inject(ToastrService);
  meuFormulario: FormGroup;

  protected curriculo!: Curriculo;

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      curTxMotivacao: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      curTxNivelEnsino: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      curTxCursoFormacao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      curTxIdiomas: ['', [Validators.minLength(5), Validators.maxLength(256)]],
      curTxDescricao: ['', [Validators.minLength(10), Validators.maxLength(500)]],
      curTxPortfolio: ['', [Validators.minLength(5), Validators.maxLength(256)]]
    });
  }

  cadastrar() {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.curriculo = this.meuFormulario.value;

    this.apiService.cadastrarCurriculo(this.curriculo)
      .subscribe({
        next: (value) => {
          this.toastService.success('Currículo cadastrado com sucesso!');
          this.meuFormulario.reset();
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message || 'Erro ao cadastrar currículo.');
        }
      });
  }

  atualizar(curNrId: number) {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.curriculo = this.meuFormulario.value;

    this.apiService.atualizarCurriculo(curNrId, this.curriculo).subscribe({
      next: (value) => {
        this.toastService.success('Currículo atualizado com sucesso!');
        this.meuFormulario.reset();
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao atualizar currículo.');
      }
    });
  }

  buscar(curNrId: number) {
    this.apiService.buscarCurriculo(curNrId).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.curriculo = response.data;
          this.meuFormulario.patchValue(this.curriculo);
          this.toastService.success('Currículo carregado com sucesso!');
        } else {
          this.toastService.error('Nenhum currículo encontrado para o ID informado.');
        }
      },
      error: (e: HttpErrorResponse) => {
        this.toastService.error(e.error.message || 'Erro ao buscar o currículo.');
      }
    });
  }
}
