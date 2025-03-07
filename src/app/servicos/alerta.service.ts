import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private alertaSubject = new Subject<{ mensagem: string, tipo: 'sucesso' | 'erro' }>();
  alerta$ = this.alertaSubject.asObservable();

  exibirAlerta(mensagem: string, tipo: 'sucesso' | 'erro' = 'sucesso') {
    this.alertaSubject.next({ mensagem, tipo });
  }
}
