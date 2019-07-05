import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

import { BASE_URL } from '../app.constants';

import { GET_WORK_TYPES } from '../actions/types';
import { fetchedWorkTypes } from '../actions/workTypeAction';

function* GetWorkTypes() {
  try {
    const response = yield axios.get(`${BASE_URL}/api/worktypes`);
    yield put(fetchedWorkTypes(response.data));
  } catch (error) {
    console.warn(error);
  }
}

export function* GetWorkTypesWatcher() {
  yield takeLatest(GET_WORK_TYPES, GetWorkTypes);
}
