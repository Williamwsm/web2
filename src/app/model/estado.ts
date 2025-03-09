export interface Estado {
  estNrId: number;
  estTxNome: string;
  estTxSigla: string;
}

export interface Cidade {
  cidNrId: number; // Correspondente ao long em C#
  cidTxNome: string; // Nome da cidade
  estNrId: number; // Correspondente ao long em C# (ID do estado)
}
