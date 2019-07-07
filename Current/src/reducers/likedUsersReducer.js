import {
    FETCHING_LIKED_USERS,
    FETCHED_LIKED_USERS,
    NO_MORE_LIKED_USERS,
    CLEAR_LIKED_USERS
  } from '../actions/types';
  
  const initialState = {
    users: [],
    loading: false,
    noMoreData: false,
  };
  
  const likedUsers = (state = initialState, action) => {
    switch (action.type) {
      case FETCHED_LIKED_USERS:
        return {
          users: state.users.concat(action.payload.data),
          loading: false,
          noMoreData: false,
        };
      case FETCHING_LIKED_USERS:
        return {
          users: state.users,
          loading: true,
          noMoreData: false,
        };
      case NO_MORE_LIKED_USERS:
        return {
          users: state.users,
          loading: false,
          noMoreData: true,
        };
      case CLEAR_LIKED_USERS:
        return {
          users: [],
          loading: false,
          noMoreData: true,
        };
      default: return state;
    }
  };
  
  export default likedUsers;