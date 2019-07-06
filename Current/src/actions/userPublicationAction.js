import {
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  CLEAR_USER_PUBLICATIONS,
} from './types';
import axios from 'axios'
import { BASE_URL } from '../app.constants';

export function likePost(postId) {
    return axios.get(BASE_URL+'/api/userpublications/likes/'+postId+'/')
}
export function promotePost(postId) {
    return axios.get(BASE_URL+'/api/userpublications/promotes/'+postId+'/')
}
export const postPublication = data => ({ type: POST_PUBLICATION, data });
export const getUserPublications = query => ({ type: GET_USER_PUBLICATIONS, query: query });
export const clearUserPublication = () => ({ type: CLEAR_USER_PUBLICATIONS });
