import {
  GET_ACCESS_TYPES,
  FETCHED_ACCESS_TYPES,
} from '../actions/types';

const initialState = {
  accessTypes: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCESS_TYPES:
      return {
        ...state,
        loading: true,
      };
    case FETCHED_ACCESS_TYPES:
      return {
        ...state,
        loading: false,
        accessTypes: action.data,
      };
    default: return state;
  }
};

export default reducer;