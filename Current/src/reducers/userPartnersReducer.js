import { FETCHED_USER_PARTNERS } from '../actions/types';

const initialState = {
  partners: [],
};

const userPartnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_USER_PARTNERS:
      return { partners: action.payload.data };
    default:
      return state;
  }
};

export default userPartnersReducer;