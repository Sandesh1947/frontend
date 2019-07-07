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
} from '../actions/types';

function callUserInfoApi() {
  return axios.get(BASE_URL + '/api/user');
//   return {
//       'data': {
//           "id": 3,
//           "first_name": "sushanth",
//           "last_name": "avaru",
//           "sex": "f",
//           "email": "savaru@eycon.com",
//           "phone": "619-724-1262",
//           "last_login": "2019-04-07T11:19:35.000Z",
//           "school": null,
//           "location": null,
//           "profession": null,
//           "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6ab9685af183298a0e1a3270ec08d5a81899f2ef/profilepic.png",
//           "updated_at": "2019-06-05T07:29:00.000Z",
//           "dob": null
//       }
//   }
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
