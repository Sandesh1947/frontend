import {
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  CLEAR_USER_PUBLICATIONS,
} from './types';

export const postPublication = data => ({ type: POST_PUBLICATION, data });
export const getUserPublications = query => ({ type: GET_USER_PUBLICATIONS, query: query });
export const clearUserPublication = () => ({ type: CLEAR_USER_PUBLICATIONS });
