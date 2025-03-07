import { InteractivityChecker } from "@angular/cdk/a11y";

export interface Candidato {
  cidNrId:Number
  canTxNome:string
  canTxCpf:string
  canTxRua ?:string
  canTxCep:string
  canTxLogradouro ?:string
  canTxEmail:string
  canTxSenha:string,
  canTxCelular:string
}
