import {
  PROMOTE_PUBLICATION,
  LIKE_PUBLICATION,
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  CLEAR_USER_PUBLICATIONS,
} from './types';

export const promotePublication = data => ({ type: PROMOTE_PUBLICATION, data });
export const likePublication = data => ({ type: LIKE_PUBLICATION, data });
export const postPublication = data => ({ type: POST_PUBLICATION, data });
export const getUserPublications = query => ({ type: GET_USER_PUBLICATIONS, query: query });
export const clearUserPublication = () => ({ type: CLEAR_USER_PUBLICATIONS });
