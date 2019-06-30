import axios from 'axios';
import { BASE_URL } from '../app.constants';
import { LOGIN, LOGOUT } from './types';

export const loginAction = data => ({ type: LOGIN, data });

export const signUp = data => axios.post(BASE_URL + '/api/signup/', data);

export const logout = () => ({ type: LOGOUT });