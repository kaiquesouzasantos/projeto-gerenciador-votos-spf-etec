// Bibliotecas de terceiros
import axios from 'axios';
import { Buffer } from 'buffer';

// Variaveis de ambiente
import { API_ADMIN_USERNAME, API_ADMIN_PASSWORD } from '@env';

const username = API_ADMIN_USERNAME as string;
const password = API_ADMIN_PASSWORD as string;

const credentials = `${username ? username : process.env.API_ADMIN_USERNAME}:${
  password ? password : process.env.API_ADMIN_USERNAME
}`;
const buffer = Buffer.from(credentials, 'utf-8');
const base64 = buffer.toString('base64');

export const axiosClient = axios.create({
  baseURL: 'https://gerenciadornotasspfbackend-production.up.railway.app',
  headers: { Authorization: `Basic ${base64}` },
});
