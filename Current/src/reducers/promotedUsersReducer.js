import {
    FETCHING_PROMOTED_USERS,
    FETCHED_PROMOTED_USERS,
    NO_MORE_PROMOTED_USERS,
    CLEAR_PROMOTED_USERS
  } from '../actions/types';
  
  const initialState = {
    users: [],
    loading: false,
    noMoreData: false,
  };
  
  const promotedUsers = (state = initialState, action) => {
    switch (action.type) {
      case FETCHED_PROMOTED_USERS:
        return {
          users: state.users.concat(action.payload.data),
          loading: false,
          noMoreData: false,
        };
      case FETCHING_PROMOTED_USERS:
        return {
          users: state.users,
          loading: true,
          noMoreData: false,
        };
      case NO_MORE_PROMOTED_USERS:
        return {
          users: state.users,
          loading: false,
          noMoreData: true,
        };
      case CLEAR_PROMOTED_USERS:
        return {
          users: [],
          loading: false,
          noMoreData: true,
        };
      default: return state;
    }
  };
  
  export default promotedUsers;