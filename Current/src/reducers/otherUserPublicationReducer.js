import {
  FETCHING_OTHER_USER_PUBLICATIONS,
  FETCHED_OTHER_USER_PUBLICATIONS,
  NO_MORE_OTHER_USER_PUBLICATIONS,
  CLEAR_OTHER_USER_PUBLICATIONS,
  FETCHED_OTHER_USER_PUBLICATIONS_ON_SCROLLING
} from '../actions/types';

const initialState = {
  publications: [],
  loading: false,
  noMoreData: false,
  page: 1
};

const otherUserPublicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_OTHER_USER_PUBLICATIONS:
      return {
        publications: action.payload.data,
        loading: false,
        noMoreData: state.noMoreData,
        page: state.page
      };
    case FETCHED_OTHER_USER_PUBLICATIONS_ON_SCROLLING:
      return {
        publications: state.publications.concat(action.payload.data),
        loading: false,
        noMoreData: state.noMoreData,
        page: state.page
      };
    case FETCHING_OTHER_USER_PUBLICATIONS:
      return {
        publications: state.publications,
        loading: true,
        noMoreData: state.noMoreData,
        page: state.page
      };
    case NO_MORE_OTHER_USER_PUBLICATIONS:
      return {
        publications: state.publications,
        loading: false,
        noMoreData: true,
        page: state.page
      };
    case CLEAR_OTHER_USER_PUBLICATIONS:
      return {
        publications: [],
        loading: false,
        noMoreData: false,
        page: 1
      };
    default: return state;
  }
};

export default otherUserPublicationReducer;