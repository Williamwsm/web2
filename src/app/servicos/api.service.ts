import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from '../../ambientes/ambiente';
import { Login } from '../model/login';
import { Candidato } from '../model/candidato';
import { Empresa } from '../model/empresa';
import { Vaga } from '../model/vaga';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = ambiente.urlApi;

  constructor(private http: HttpClient) {}

  login(form: Login) {
    return this.http.post(`${this.urlApi}/usuarios/login`, form );
  }

  candidato(form: Candidato) {
    return this.http.post(`${this.urlApi}/candidatos/cadastrar`, form );
  }

  empresa(form: Empresa ) {
    return this.http.post(`${this.urlApi}/empresas/cadastrar`, form );
  }

  vaga(form: Vaga ) {
    return this.http.post(`${this.urlApi}/empresas/vagas/cadastrar`, form );
  }
}
