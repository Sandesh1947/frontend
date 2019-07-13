import {
  FETCHING_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
  CLEAR_USER_PUBLICATIONS,
  POST_PUBLICATION,
  POSTED_PUBLICATION,
} from '../actions/types';

const initialState = {
  publications: [],
  loading: false,
  noMoreData: false,
  page:1
};

const userPublicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_USER_PUBLICATIONS:
      return {
        publications: state.publications.concat(action.payload.data),
        loading: false,
        noMoreData: false,
        page:state.page
      };
    case FETCHING_USER_PUBLICATIONS:
      return {
        publications: state.publications,
        loading: true,
        noMoreData: false,
        page:state.page
      };
    case NO_MORE_USER_PUBLICATIONS:
      return {
        publications: state.publications,
        loading: false,
        noMoreData: true,
        page:state.page
      };
    case CLEAR_USER_PUBLICATIONS:
      return {
        publications: [],
        loading: false,
        noMoreData: true,
        page:state.page
      };
    case POST_PUBLICATION:
      return {
        ...state,
        posting: true,
      };
    case POSTED_PUBLICATION: {
      return {
        ...state,
        posting: false,
      };
    }
    default: return state;
  }
};

export default userPublicationReducer;