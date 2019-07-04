import axios from 'axios'
import { BASE_URL } from '../app.constants';
export function peopleSearch(params) {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/searchusers',
        params: params,
      });
}
export function publicationSearch(params) {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/searchpublications',
        params: params,
      });
}