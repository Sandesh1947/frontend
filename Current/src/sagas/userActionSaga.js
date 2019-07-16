import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../app.constants';

import {
  GET_USER_INFO,
  FETCHED_USER_INFO,
  FETCHED_USER_PARTNERS,
  GET_USER_FOLLOWERS,
  FETCHED_USER_FOLLOWERS,
  ERROR_OCCUR,
  FETHCED_OTHER_USER_INFO,
  GET_OTHER_USER_INFO
} from '../actions/types';

function callUserInfoApi() {
  return axios.get(BASE_URL + '/api/user');
}

function* getUserInfo() {
  try {
    const infoResponse = yield call(callUserInfoApi);
    // const infoResponse = yield callUserInfoApi()
    yield put({ type: FETCHED_USER_INFO, payload: infoResponse });
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}

export function* userInfoWatcher() {
  yield takeLatest(GET_USER_INFO, getUserInfo);
}

// User followers saga
function callUserFollowersApi() {
  return axios.get(BASE_URL + '/api/followers');
  // return {
  //     'data': [
  //         { 'id': 1, 'first_name': 'harikrishnan', 'last_name': 'm' }
  //     ]
  // }
}
function* getUserFollowers() {
  try {
    const followersResponse = yield call(callUserFollowersApi);
    // const followersResponse = yield callUserFollowersApi()
    yield put({ type: FETCHED_USER_FOLLOWERS, payload: followersResponse });
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}
export function* userFollowerWatcher() {
  yield takeLatest(GET_USER_FOLLOWERS, getUserFollowers);
}

// User partners saga
function callUserPartnersApi() {
  return axios.get(BASE_URL + '/api/partners');
}
function* getPartners() {
  try {
    const partnersResponse = yield call(callUserPartnersApi);
    yield put({ type: FETCHED_USER_PARTNERS, payload: partnersResponse });
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}
export function* userPartnerWatcher() {
  yield takeLatest('callUserPartnersApi', getPartners);
}



function* getOtherUserInfo(action) {
  try {
    const infoResponse = yield axios.get(BASE_URL + '/api/otheruser/'+action.user_id+'/');
    yield put({ type: FETHCED_OTHER_USER_INFO, payload: infoResponse });
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}

export function* otherUserInfoWatcher() {
  yield takeLatest(GET_OTHER_USER_INFO, getOtherUserInfo);
}
