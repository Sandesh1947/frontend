import axios from 'axios';
import { BASE_URL } from '../app.constants';
import { LOGIN } from './types';

export const loginAction = data => ({ type: LOGIN, data });

export const signUp = data => {
  return axios.post(BASE_URL + '/api/signup/', data);
};