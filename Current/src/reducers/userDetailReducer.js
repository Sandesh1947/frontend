import { FETCHED_USER_INFO } from '../actions/types';

const userDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCHED_USER_INFO:
      return { user: action.payload.data };
    default:
      return state;
  }
};

export default userDetailReducer;