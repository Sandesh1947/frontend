import {
  GET_USER_INFO,
  GET_USER_FOLLOWERS,
  GET_PARTNERS,
  GET_OTHER_USER_INFO

} from './types';

export const getUserInfo = () => ({ type: GET_USER_INFO });

export const getUserFollowers = () => ({ type: GET_USER_FOLLOWERS });

export const getPartners = () => ({ type: GET_PARTNERS });

export const getOtherUserProfile =(user_id) =>({ type: GET_OTHER_USER_INFO,user_id:user_id })
