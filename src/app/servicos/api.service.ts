import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ambiente } from '../../ambientes/ambiente';
import { Login } from '../model/login';
import { Candidato } from '../model/candidato';
import { Curriculo } from '../model/curriculo';
import { Empresa } from '../model/empresa';
import { Vaga } from '../model/vaga';
import { Observable } from 'rxjs';
import { Endereco } from '../model/endereco';
import { ResponseApi } from '../model/reponseapi';
import { PageResponse } from '../model/pageResponse';
import { FiltroVaga } from '../model/filtros/vaga';
import { Cidade, Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = ambiente.urlApi;
  private http = inject(HttpClient);

  login(form: Login):Observable<ResponseApi<string>> {
    return this.http.post<ResponseApi<string>>(`${this.urlApi}/usuarios/login`, form );
  }

  cadasTrarCandidato(form: Candidato) : Observable<void> {
    return this.http.post<void>(`${this.urlApi}/candidatos/cadastrar`, form );
  }

  empresa(form: Empresa ) {
    return this.http.post(`${this.urlApi}/empresas/cadastrar`, form );
  }

  vaga(form: Vaga ) {
    return this.http.post(`${this.urlApi}/empresas/vagas/cadastrar`, form );
  }

  buscarEnderecoPorCep(cep:string):Observable<ResponseApi<Endereco>>{
    return this.http.get<ResponseApi<Endereco>>(`${this.urlApi}/via-cep/buscar-endereco/${cep}`);
  }

  buscarVagas(filtro?:FiltroVaga):Observable<ResponseApi<PageResponse<Vaga>>>{
    const params = filtro
    ? new HttpParams({
        fromObject: Object.fromEntries(
          Object.entries(filtro).filter(([_, value]) => value != null)
        )
      })
    : new HttpParams();
    return this.http.get<ResponseApi<PageResponse<Vaga>>>(`${this.urlApi}/vagas`,{params});
  }

  buscarEstados():Observable<ResponseApi<Estado[]>>{
    return this.http.get<ResponseApi<Estado[]>>(`${this.urlApi}/via-cep/estados`);
  }

  buscarCidadeComBaseNoEstado(estNrId:number):Observable<ResponseApi<Cidade[]>>{
    return this.http.get<ResponseApi<Cidade[]>>(`${this.urlApi}/via-cep/cidades/${estNrId}`);
  }

  inscreverEmVaga(vagNrId:number):Observable<ResponseApi<void>>{
    return this.http.post<ResponseApi<void>>(`${this.urlApi}/candidatos/vagas/inscricoes/${vagNrId}`,{});
  }

  buscarVagasDoCandidato():Observable<ResponseApi<Vaga[]>>{
    return this.http.get<ResponseApi<Vaga[]>>(`${this.urlApi}/candidatos/vagas`);
  }

  cadastrarCurriculo(form: Curriculo): Observable<void> {
    return this.http.post<void>(`${this.urlApi}/candidatos/curriculos/cadastrar`, form);
  }

  atualizarCurriculo(curNrId: number, form: Curriculo): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/candidatos/curriculos/atualizar/${curNrId}`, form);
  }

  buscarCurriculo(curNrId: number): Observable<ResponseApi<Curriculo>> {
    return this.http.get<ResponseApi<Curriculo>>(`${this.urlApi}/candidatos/curriculos/${curNrId}`);
  }

}
