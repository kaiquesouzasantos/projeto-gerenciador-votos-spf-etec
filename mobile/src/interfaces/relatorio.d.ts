import { Sala } from './sala';

export interface Relatorio {
  sala: Sala;
  nota: number;
  apresentacoes: ApresentacaoFull[];
}
