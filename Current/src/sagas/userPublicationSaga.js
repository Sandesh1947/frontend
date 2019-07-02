import axios from 'axios';
import { takeEvery, call } from 'redux-saga/effects';

import { BASE_URL } from '../app.constants';
import { PROMOTE_PUBLICATION, LIKE_PUBLICATION } from '../actions/types';

const callAPI = (method, data) => axios.post(`${BASE_URL}/api/userpublication/${method}`, data);

function* LikePublication(action) {
  try {
    const response = yield call(callAPI, 'like', action.data);
    // yield put({ type: LIKED_PUBLICATION, payload: response.data });
  } catch (error) {
    console.warn(error);
  }
}

function* PromotePublication(action) {
  try {
    const response = yield call(callAPI, 'promote', action.data);
    // yield put({ type: PROMOTED_PUBLICATION, payload: response.data });
  } catch (error) {
    console.warn(error);
  }
}

export function* LikePublicationWatcher() {
  yield takeEvery(LIKE_PUBLICATION, LikePublication);
}

export function* PromotePublicationWatcher() {
  yield takeEvery(PROMOTE_PUBLICATION, PromotePublication);
}