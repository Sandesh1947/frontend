import {SEARCH_SUBMITTED} from '../actions/types';

const searchKeywordReducer = (state = {keyword:null}, action) => {
  switch (action.type) {
    case SEARCH_SUBMITTED:
      return {'keyword':action.keyword };
    default:
      return state;
  }
};

export default searchKeywordReducer;