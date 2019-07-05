import {
  GET_USER_INFO,
  GET_USER_PUBLICATIONS,
  GET_USER_FOLLOWERS,
  GET_PARTNERS,
  PUBLISH_POST,
  CLEAR_USER_PUBLICATIONS
} from './types';

export const getUserInfo = () => ({ type: GET_USER_INFO });

export const getUserPublications = (query) => ({ type: GET_USER_PUBLICATIONS,query:query });

export const getUserFollowers = () => ({ type: GET_USER_FOLLOWERS });

export const publishPost = data => ({ type: PUBLISH_POST, data });

export const getPartners = () => ({ type: GET_PARTNERS });

export const clearUserPublication = () => ({ type: CLEAR_USER_PUBLICATIONS })