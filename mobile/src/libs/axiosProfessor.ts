// Bibliotecas de terceiros
import axios from 'axios';
import { Buffer } from 'buffer';

import { API_PROFESSOR_USERNAME, API_PROFESSOR_PASSWORD } from '@env';

const username = API_PROFESSOR_USERNAME as string;
const password = API_PROFESSOR_PASSWORD as string;

const credentials = `${
  username ? username : process.env.API_PROFESSOR_USERNAME
}:${password ? password : process.env.API_PROFESSOR_PASSWORD}`;
const buffer = Buffer.from(credentials, 'utf-8');
const base64 = buffer.toString('base64');

export const axiosProfessor = axios.create({
  baseURL: 'https://gerenciadornotasspfbackend-production.up.railway.app',
  headers: { Authorization: `Basic ${base64}` },
});
