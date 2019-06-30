import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../app.constants';

import {
  GET_USER_INFO,
  FETCHED_USER_INFO,
  GET_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  FETCHING_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
  FETCHED_USER_PARTNERS,
  GET_USER_FOLLOWERS,
  FETCHED_USER_FOLLOWERS,
  PUBLISH_POST,
  ERROR_OCCUR,
} from '../actions/types';

function callUserInfoApi() {
  return axios.get(BASE_URL + '/api/user');
  // return {
  //     'data': {
  //         "id": 3,
  //         "first_name": "sushanth",
  //         "last_name": "avaru",
  //         "sex": "f",
  //         "email": "savaru@eycon.com",
  //         "phone": "619-724-1262",
  //         "last_login": "2019-04-07T11:19:35.000Z",
  //         "school": null,
  //         "location": null,
  //         "profession": null,
  //         "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6ab9685af183298a0e1a3270ec08d5a81899f2ef/profilepic.png",
  //         "updated_at": "2019-06-05T07:29:00.000Z",
  //         "dob": null
  //     }
  // }
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

// USER PUBLICATION SAGA
function callUserPubApi(action) {
  return axios({
    method: 'get',
    url: BASE_URL + '/api/userpublications',
    params: action.params,
  });

  // return {
  //     'data': [
  //         {
  //             "id": 113,
  //             "publication_text": "hiytyt",
  //             "publication_img": "0",
  //             "publication_vid": "0",
  //             "post": null,
  //             "user_id": 3,
  //             "created_at": "2019-06-24T06:51:36.000Z",
  //             "updated_at": "2019-06-24T06:51:36.000Z",
  //             "first_name": "sushanth",
  //             "last_name": "avaru",
  //             "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6ab9685af183298a0e1a3270ec08d5a81899f2ef/profilepic.png",
  //             "likes": null,
  //             "promote": null
  //         },
  //         {
  //             "id": 112,
  //             "publication_text": "hii post",
  //             "publication_img": "1",
  //             "publication_vid": "0",
  //             "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ecde4f57dbc399ff5fe867e82627647b6e4e84bf/elements-of-art-6.jpg",
  //             "user_id": 3,
  //             "created_at": "2019-06-23T18:08:03.000Z",
  //             "updated_at": "2019-06-24T06:31:59.000Z",
  //             "first_name": "sushanth",
  //             "last_name": "avaru",
  //             "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBGUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6ab9685af183298a0e1a3270ec08d5a81899f2ef/profilepic.png",
  //             "likes": 3,
  //             "promote": 5
  //         }]
  // }
}
function* getUserPublications(action) {
  try {
    yield put({ type: FETCHING_USER_PUBLICATIONS });
    const pubResponse = yield callUserPubApi(action);
    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_USER_PUBLICATIONS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_USER_PUBLICATIONS });
    }

  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}
export function* userPublicationWatcher() {
  yield takeLatest(GET_USER_PUBLICATIONS, getUserPublications);
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

// Publishing post saga
function callPublishPostApi(action) {
  return axios.post(BASE_URL + '/api/publish', action.data);
}
function* postPublish(action) {
  try {
    yield call(callPublishPostApi, action);
    yield put({ type: GET_USER_PUBLICATIONS });
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}
export function* publishPostWatcher() {
  yield takeLatest(PUBLISH_POST, postPublish);
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
