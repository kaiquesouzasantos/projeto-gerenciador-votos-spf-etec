import { AxiosResponse } from 'axios';
import { ApresentacaoFull } from './apresentacao';
import { Sala } from './sala';

export interface IClassificacao {
  sala: Sala;
  nota: number;
  apresentacoes: ApresentacaoFull[];
}

export interface AxiosResponseClassificacao extends AxiosResponse {
  data: IClassificacao[];
}
