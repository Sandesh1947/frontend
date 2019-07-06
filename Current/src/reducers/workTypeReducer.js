import {
  GET_WORK_TYPES,
  FETCHED_WORK_TYPES,
} from '../actions/types';

const initialState = {
  workTypes: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORK_TYPES:
      return {
        ...state,
        loading: true,
      };
    case FETCHED_WORK_TYPES:
      return {
        ...state,
        loading: false,
        workTypes: action.data,
      };
    default: return state;
  }
};

export default reducer;