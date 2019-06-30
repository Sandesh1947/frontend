import axios from "axios";
import { BASE_URL } from '../app.constants';
export function loginAction(postData) {
    return{type:'LOGIN',data:postData}
}
export function signUp(data) {
    return axios.post(BASE_URL+'/api/signup/',data)
}
export function loginOutAction() {
    return{type:'LOGOUT'}
}