import axios from 'axios';

export const setInterceptor = () => {
  const auth_token = localStorage.getItem('AUTH_TOKEN');
  if (auth_token) {
    axios.defaults.headers.common['Authorization'] = auth_token;
  }
}