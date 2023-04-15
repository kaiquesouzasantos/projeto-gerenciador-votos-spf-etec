import { AxiosResponse } from 'axios';

export interface Professor {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export interface AxiosResponseProfessor extends AxiosResponse {
  data: Professor;
}
