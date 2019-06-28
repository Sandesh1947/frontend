import { combineReducers } from 'redux';
import LoginStateReducer from './loginReducer'
import UserDetailReducer from './userDetailReducer'
import UserPublicationReducer from './userPublicationReducer'
import UserFollowersReducer from './userFollowersReducer'
import UserPartnersReducer from './userPartnersReducer'
export default combineReducers({
    logindata: LoginStateReducer,
    userInfo:UserDetailReducer,
    userPublications:UserPublicationReducer,
    userFollowers:UserFollowersReducer,
    userPartners:UserPartnersReducer
})