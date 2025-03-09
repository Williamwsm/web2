import { ExperienciaEnum, FormacaoEnum, ModalidadeEnum, TipoVagaEnum } from "./enuns/vaga";

export interface Vaga {
  vagNrId: number;
  empNrId: number;
  vagNrQuantidade: number;
  vagNrQuantidadeInscritos: number;
  vagTxDescricao: string;
  vagTxRequisitos: string;
  vagNrCargaHoraria: number;
  vagDtLimite: Date;
  vagDtCriacao: Date;
  cidTxNome: string;
  cidNrId: number;
  estTxSigla: string;
  estNrId: number;
  empTxNome: string;
  empTxEmail: string;
  empTxLogradouro: string;
  empTxNumero: string;
  empTxTelefone: string;
  emprNrId: number;
  vagTxTitulo:string;
  vagTxModalidade:ModalidadeEnum,
  vagTxTipo:TipoVagaEnum,
  vagTxFormacao:FormacaoEnum,
  vagTxExperiencia:ExperienciaEnum,
  vagBlInscrito?:boolean
}
