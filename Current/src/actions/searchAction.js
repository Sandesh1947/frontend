import axios from 'axios'
import { BASE_URL } from '../app.constants';
export function peopleSearch(keyword) {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/searchusers',
        params: {'search':keyword},
      });
}
export function publicationSearch(keyword) {
    return axios({
        method: 'get',
        url: BASE_URL + '/api/searchpublications',
        params: {'search':keyword},
      });
}