import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { VgCriadaPipe } from '../../../../vg-criada.pipe';
import { VgEncerramentoPipe } from '../../../../vg-encerramento.pipe';
import { Vaga } from '../../../../model/vaga';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../../servicos/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { EmptyComponent } from "../../../../components/empty/empty.component";

@Component({
  selector: 'app-minhas-vagas',
  standalone: true,
  imports: [ MatIcon, RouterLink, EmptyComponent],
  templateUrl: './minhas-vagas.component.html',
  styleUrl: './minhas-vagas.component.css'
})
export class MinhasVagasComponent implements OnInit{

  apiService:ApiService = inject(ApiService);
  vagas:Vaga[] | null = null;
  toast:ToastrService = inject(ToastrService);
  vaga:Vaga | null = null;

  ngOnInit(): void {
    this.apiService.buscarVagasDaEmpresa()
    .subscribe({
      next:(value)=>{
          this.vagas = value.data;
      },
      error:(e:HttpErrorResponse)=>{
        this.toast.error(e.error.response)
      }
    })
  }
}
