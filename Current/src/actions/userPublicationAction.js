import {
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  CLEAR_USER_PUBLICATIONS,
  FETCH_LIKED_USERS,
  FETCH_PROMOTED_USERS
} from './types';
import axios from 'axios'
import { BASE_URL } from '../app.constants';

export function likePost(postId) {
  return axios.get(BASE_URL + '/api/userpublications/likes/' + postId + '/')
}
export function promotePost(postId) {
  return axios.get(BASE_URL + '/api/userpublications/promotes/' + postId + '/')
}
export const postPublication = data => ({ type: POST_PUBLICATION, data });
export const getUserPublications = query => ({ type: GET_USER_PUBLICATIONS, query: query });
export const clearUserPublication = () => ({ type: CLEAR_USER_PUBLICATIONS });

export const  fetchLikedUsers = (id,query) => ({type:FETCH_LIKED_USERS,query:query,id:id})
export const  fetchPromotedUsers = (id,query) => ({type:FETCH_PROMOTED_USERS,query:query,id:id})