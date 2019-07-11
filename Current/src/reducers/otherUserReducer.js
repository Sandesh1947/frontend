import { FETHCED_OTHER_USER_INFO } from '../actions/types';

const otherUserDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETHCED_OTHER_USER_INFO:
      return { user: action.payload.data };
    default:
      return state;
  }
};

export default otherUserDetailReducer;