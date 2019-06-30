import {
  FETCHING_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
} from '../actions/types';

const initialState = {
  publications: [],
  loading: false,
  noMoreData: false,
};

const userPublicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_USER_PUBLICATIONS:
      return {
        publications: state.publications.concat(action.payload.data),
        loading: false,
        noMoreData: false,
      };
    case FETCHING_USER_PUBLICATIONS:
      return {
        publications: state.publications,
        loading: true,
        noMoreData: false,
      };
    case NO_MORE_USER_PUBLICATIONS:
      return {
        publications: state.publications,
        loading: false,
        noMoreData: true,
      };
    default: return state;
  }
};

export default userPublicationReducer;