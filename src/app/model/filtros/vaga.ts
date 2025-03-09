import { ExperienciaEnum, TipoVagaEnum } from "../enuns/vaga";

export interface FiltroVaga{
  CidNrId?: number;
  EstNrId?: number;
  VagBlRemoto?: boolean;
  VagBlPresencial?: boolean;
  VagBlHibrido?: boolean;
  VagTxTipo?: TipoVagaEnum;
  VagTxExperiencia?:ExperienciaEnum
}
