import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from '../../ambientes/ambiente';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = ambiente.urlApi;

  constructor(private http: HttpClient) {}

  login() {
    return this.http.post(`${this.urlApi}/usuarios/login`, );
  }
}
