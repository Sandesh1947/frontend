import axios from "axios";
export function loginAction(postData) {
    return{type:'LOGIN',data:postData}
}
export function signUp(data) {
    return axios.post('/api/signup')
}