import { AxiosResponse } from 'axios';

export interface Sala {
  id: string;
  nome: string;
}

export interface AxiosReponseSalaAll extends AxiosResponse {
  data: Sala[];
}
