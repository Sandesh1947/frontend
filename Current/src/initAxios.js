import axios from 'axios';
export default {
  setupInterceptors: (token) => {
    axios.interceptors.response.use((response) => {
      axios.defaults.headers.common['Authorization'] = token;
      return response;
    }, (error) => {
      let response = error.response;
      if (response.request.status === 403) {
        window.location.replace(window.location.origin +'/login');
      }
      if (response.request.status === 500) {
        // window.location.replace(window.location.origin +'/servererror');
      }
      return Promise.reject(error.response);
    });

  }
};