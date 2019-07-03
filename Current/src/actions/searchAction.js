import {SEARCH_SUBMITTED} from './types'
import axios from 'axios'
import { BASE_URL } from '../app.constants';

export function submitSearchKeyword(keyword) {
    return (
        { type: SEARCH_SUBMITTED, keyword: keyword }
    )
}
export function peopleSearch(keywordObj) {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/searchusers',
        params: {'search':keywordObj.keyword},
      });
}
export function publicationSearch(keywordObj) {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/searchpublications',
        params: {'search':keywordObj.keyword},
      });
}