import { FETCHED_USER_FOLLOWERS } from '../actions/types';

const initialState = {
  followers: [],
};

const userFollowersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_USER_FOLLOWERS:
      return { followers: action.payload.data };
    default:
      return state;
  }
};

export default userFollowersReducer;