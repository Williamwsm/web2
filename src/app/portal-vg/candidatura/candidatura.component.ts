import { Component, inject, OnInit } from '@angular/core';
import { DestaqueComponent } from "../../login/menu/destaque/destaque.component";
import { FiltrosComponent } from "./filtros/filtros.component";
import { CardVagasComponent } from "./card-vagas/card-vagas.component";
import { SuasCadidaturasComponent } from "./suas-cadidaturas/suas-cadidaturas.component";
import { ApiService } from '../../servicos/api.service';
import { Vaga } from '../../model/vaga';
import { Toast, ToastrService } from 'ngx-toastr';
import { FiltroVaga } from '../../model/filtros/vaga';
import { Estado } from '../../model/estado';
import { EmptyComponent } from '../../components/empty/empty.component';
import { ExperienciaEnum, TipoVagaEnum } from '../../model/enuns/vaga';
import { ConfirmarVagaComponent } from '../../components/confirmar-vaga/confirmar-vaga.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-candidatura',
  standalone: true,
  imports: [FiltrosComponent, CardVagasComponent, SuasCadidaturasComponent, EmptyComponent, ConfirmarVagaComponent],
  templateUrl: './candidatura.component.html',
  styleUrl: './candidatura.component.css'
})
export class CandidaturaComponent implements OnInit {

  private apiService: ApiService = inject(ApiService);
  protected vagas: Vaga[] | null = []
  protected toast: ToastrService = inject(ToastrService)
  protected estados!: Estado[];

  protected isHibrido: boolean = false;
  protected isRemoto: boolean = false;
  protected isPresencial: boolean = false;
  protected vagTxExperienca: ExperienciaEnum | undefined = undefined;
  protected vagTxTipo: TipoVagaEnum | undefined = undefined;
  protected estNrId: number | undefined = undefined;
  protected cidNrId: number | undefined = undefined;
  protected isExibirConfirmacao: boolean = false;
  protected vaga: Vaga | null = null;
  protected vagasCandidato: Vaga[] | null = null

  ngOnInit(): void {
    this.findVagas();
    this.findEstados();
  }

  private findVagas(filtro?: FiltroVaga) {
    console.log(filtro);

    this.apiService.buscarVagas(filtro).subscribe({
      next: (response) => {
        this.vagas = response.data.items;
        this.findVagasDoCandidato()
      },
      error: (err) => {
        this.toast.error("Ocorreu algum erro ao buscar perfis")
      },
      complete: () => {
        console.log('Requisição concluída');
      }
    });
  }

  private findEstados() {
    this.apiService.buscarEstados().subscribe({
      next: (response) => {
        console.log(response); // Aqui você pode acessar os dados da resposta, como "response.data"
        this.estados = response.data
      },
      error: (err) => {
        this.toast.error("Ocorreu algum erro ao buscar estados")
      },
      complete: () => {
        console.log('Requisição concluída');
      }
    });
  }

  findVagasDoCandidato() {
    this.apiService.buscarVagasDoCandidato()
      .subscribe({
        next: (value) => {
          this.vagasCandidato = value.data

          this.vagas?.forEach(vaga => {
            const possuiCandidato = this.vagasCandidato?.some(vc => vc.vagNrId === vaga.vagNrId);

            if (possuiCandidato) {
              vaga.vagBlInscrito = true;
            }
          });

          console.log(this.vagas);


        },
        error:(e:HttpErrorResponse)=>{
            this.toast.error(e.error.message)
        }
      })
  }

  buscarComFiltrosSelecionados() {
    this.findVagas({ VagBlHibrido: this.isHibrido, VagBlPresencial: this.isPresencial, VagBlRemoto: this.isRemoto, CidNrId: this.cidNrId, EstNrId: this.estNrId, VagTxExperiencia: this.vagTxExperienca, VagTxTipo: this.vagTxTipo })
  }

  onRemotoChange(value: boolean) {
    this.isRemoto = value;
    this.buscarComFiltrosSelecionados();
  }

  onHibridoChange(value: boolean) {
    this.isHibrido = value;
    this.buscarComFiltrosSelecionados();
  }

  onPresencialChange(value: boolean) {
    this.isPresencial = value;
    this.buscarComFiltrosSelecionados();
  }

  onEstadoChange(value: number) {
    this.estNrId = value;
    this.buscarComFiltrosSelecionados()
  }

  onCidadeChange(value: number) {
    this.cidNrId = value
    this.buscarComFiltrosSelecionados();
  }

  onExperienciaChange(value: ExperienciaEnum | undefined) {
    this.vagTxExperienca = value
    this.buscarComFiltrosSelecionados()
  }

  ontTipoVagaChange(value: TipoVagaEnum | undefined) {
    this.vagTxTipo = value;
    this.buscarComFiltrosSelecionados();
  }

  onChangeVaga(vaga: Vaga | null) {
    if (vaga == null) {
      this.buscarComFiltrosSelecionados();
    }
    this.vaga = vaga;
  }
}
