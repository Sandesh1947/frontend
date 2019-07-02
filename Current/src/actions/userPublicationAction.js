import {
  PROMOTE_PUBLICATION,
  LIKE_PUBLICATION,
} from './types';

export const promotePublication = data => ({ type: PROMOTE_PUBLICATION, data });
export const likePublication = data => ({ type: LIKE_PUBLICATION, data });