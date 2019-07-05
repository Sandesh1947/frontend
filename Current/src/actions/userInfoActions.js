import {
  GET_USER_INFO,
  GET_USER_FOLLOWERS,
  GET_PARTNERS,
} from './types';

export const getUserInfo = () => ({ type: GET_USER_INFO });

export const getUserFollowers = () => ({ type: GET_USER_FOLLOWERS });

export const getPartners = () => ({ type: GET_PARTNERS });
