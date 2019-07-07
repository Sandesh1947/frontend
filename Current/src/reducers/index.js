import { combineReducers } from 'redux';
import logindata from './loginReducer';
import userInfo from './userDetailReducer';
import userPublications from './userPublicationReducer';
import userFollowers from './userFollowersReducer';
import userPartners from './userPartnersReducer';
import workTypes from './workTypeReducer';
import accessTypes from './accessTypeReducer';
import likedUsers from './likedUsersReducer'
import promotedUsers from './promotedUsersReducer'
export default combineReducers({
  logindata,
  userInfo,
  userPublications,
  userFollowers,
  userPartners,
  workTypes,
  accessTypes,
  likedUsers,
  promotedUsers
});
