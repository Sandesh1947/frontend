import {
    FETCHING_OTHER_USER_PUBLICATIONS,
    FETCHED_OTHER_USER_PUBLICATIONS,
    NO_MORE_OTHER_USER_PUBLICATIONS,
    CLEAR_OTHER_USER_PUBLICATIONS,
  } from '../actions/types';
  
  const initialState = {
    publications: [],
    loading: false,
    noMoreData: false,
  };
  
  const otherUserPublicationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHED_OTHER_USER_PUBLICATIONS:
        return {
          publications: state.publications.concat(action.payload.data),
          loading: false,
          noMoreData: false,
        };
      case FETCHING_OTHER_USER_PUBLICATIONS:
        return {
          publications: state.publications,
          loading: true,
          noMoreData: false,
        };
      case NO_MORE_OTHER_USER_PUBLICATIONS:
        return {
          publications: state.publications,
          loading: false,
          noMoreData: true,
        };
      case CLEAR_OTHER_USER_PUBLICATIONS:
        return {
          publications: [],
          loading: false,
          noMoreData: true,
        };
      default: return state;
    }
  };
  
  export default otherUserPublicationReducer;