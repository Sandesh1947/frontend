import axios from 'axios'
import { BASE_URL } from '../app.constants';
export function likePost(postId) {
    return axios.get(BASE_URL+'/api/userpublications/likes/'+postId+'/')
}
export function promotePost(postId) {
    return axios.get(BASE_URL+'/api/userpublications/promotes/'+postId+'/')
}