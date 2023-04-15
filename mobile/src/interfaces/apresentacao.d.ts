import { AxiosResponse } from 'axios';
import { Avaliacao } from './Avaliacao';

export interface Apresentacao {
  avaliacoes: null;
  id: string;
  nome: string;
  nota: null;
  sala: string;
}

export interface ApresentacaoFull extends Apresentacao {
  nota: number;
  avaliacoes: Avaliacao[];
}

export interface AxiosReponseApresentacaoAll extends AxiosResponse {
  data: Apresentacao[];
}
