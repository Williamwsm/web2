import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../login/menu/menu/menu.component';
import { ApiService } from '../../servicos/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Curriculo } from '../../model/curriculo';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadComponent } from '../../components/load/load.component';

@Component({
  selector: 'app-form-curriculo',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, NgClass, LoadComponent],
  templateUrl: './form-curriculo.component.html',
  styleUrl: './form-curriculo.component.css'
})

export class FormCurriculoComponent implements OnInit {
  protected apiService: ApiService = inject(ApiService);
  toastService: ToastrService = inject(ToastrService);
  meuFormulario: FormGroup;
  private router: Router = inject(Router);
  isload:boolean = false;
  protected curriculo!: Curriculo;
  //pegar pela rota
  route:ActivatedRoute = inject(ActivatedRoute);
  curNrId:number | null = null;

  constructor(private fb: FormBuilder) {
    this.meuFormulario = this.fb.group({
      curTxMotivacao: ['', [Validators.minLength(10), Validators.maxLength(500), Validators.required]],
      curTxNivelEnsino: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      curTxCursoFormacao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      curTxIdiomas: ['', [Validators.minLength(5), Validators.maxLength(256), Validators.required]],
      curTxDescricao: ['', [Validators.minLength(10), Validators.maxLength(500), Validators.required]],
      curTxPortfolio: ['', [Validators.minLength(5), Validators.maxLength(256), Validators.required]]
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const curNrId = params.get('curNrId');
      if (curNrId) {
        this.buscar(parseInt(curNrId));
        this.curNrId = parseInt(curNrId);
      }
    });
  }

  submit(){
    if (this.curNrId) {
        this.atualizar(this.curNrId);
        return;
    }
    this.cadastrar();
  }

  cadastrar() {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.curriculo = this.meuFormulario.value;
    this.isload = true;

    setTimeout(() => {
      this.apiService.cadastrarCurriculo(this.curriculo)
        .subscribe({
          next: (value) => {
            this.toastService.success('Currículo cadastrado com sucesso!');
            this.meuFormulario.reset();
            this.isload = false;
            this.router.navigate(['/vagas'])
          },
          error: (e: HttpErrorResponse) => {
            this.toastService.error(e.error.message || 'Erro ao cadastrar currículo.');
            this.isload = false;
          }
        });
    }, 1000);
  }

  atualizar(curNrId: number) {
    if (this.meuFormulario.invalid) {
      this.toastService.error('Preencha todos os campos obrigatórios!');
      return;
    }

    this.curriculo = this.meuFormulario.value;
    this.isload = true;
    setTimeout(()=>{
      this.apiService.atualizarCurriculo(curNrId, this.curriculo).subscribe({
        next: (value) => {
          this.toastService.success('Currículo atualizado com sucesso!');
          this.meuFormulario.reset();
          this.isload = false;
          this.router.navigate(['/vagas'])
        },
        error: (e: HttpErrorResponse) => {
          this.toastService.error(e.error.message || 'Erro ao atualizar currículo.');
          this.isload = false;
        }
      });
    }, 1000)
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
