import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ambiente } from '../../ambientes/ambiente';
import { Login } from '../model/login';
import { Candidato } from '../model/candidato';
import { Empresa } from '../model/empresa';
import { Vaga } from '../model/vaga';
import { Observable } from 'rxjs';
import { Endereco } from '../model/endereco';
import { ResponseApi } from '../model/reponseapi';

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

  buscarVagas():Observable<ResponseApi<Vaga>>{
    return this.http.get<ResponseApi<Vaga>>(`${this.urlApi}/vagas`);
  }

}
