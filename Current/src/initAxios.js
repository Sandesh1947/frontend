import axios from 'axios';
export function setInterceptor() {
    let auth_token = localStorage.getItem('AUTH_TOKEN')
    console.log('in setinteceptr')
    console.log(auth_token)
    if(auth_token)
    axios.defaults.headers.common['Authorization'] = auth_token;
}