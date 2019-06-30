import { LOGIN_COMPLETED, LOGIN_FAILED, LOGOUT } from '../actions/types';

const loginStateReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_COMPLETED:
      return { AUTH_TOKEN: action.payload };
    case LOGIN_FAILED:
      return { login_failed: true };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default loginStateReducer;