import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { BASE_URL } from '../app.constants';
import Attachment from '../components/generic/Attachment';
import {
  getUserPublications,
  clearUserPublication,
  postedPublication,
} from '../actions/userPublicationAction';

import {
  ERROR_OCCUR,
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  FETCHING_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
  FETCHING_LIKED_USERS,
  FETCHING_PROMOTED_USERS,
  FETCHED_LIKED_USERS,
  FETCHED_PROMOTED_USERS,
  NO_MORE_PROMOTED_USERS,
  NO_MORE_LIKED_USERS,
  FETCH_PROMOTED_USERS,
  FETCH_LIKED_USERS,
  FETCHING_OTHER_USER_PUBLICATIONS ,
  GET_OTHER_USER_PUBLICATIONS,
  NO_MORE_OTHER_USER_PUBLICATIONS,
  FETCHED_OTHER_USER_PUBLICATIONS ,

} from '../actions/types';

// posting user publication saga
function* postPublication(action) {
  try {
    const { attachment, text, workType, accessType, publicationType } = action.data;
    const isImage = attachment && Attachment.isImage(attachment);
    const isVideo = attachment && !isImage && Attachment.isVideo(attachment);
    const isDocument = attachment && !isImage && !isVideo;

    const params = {
      post: attachment,
      'publication_img': isImage ? '1' : '0',
      'publication_vid': isVideo ? '1' : '0',
      'publication_doc': isDocument ? '1' : '0',
      'publication_text': text,
      'work_type': workType ? workType.id : null,
      'access': accessType ? accessType.id : 1,
      'publication_type': publicationType === 'work' ? 2 : 1,
    };

    let post = params;
    if (params.post) {
      // if there's an attachment - send form-data request
      post = new FormData();
      Object.keys(params).forEach(param => post.append(param, params[param]));
    }

    yield axios.post(BASE_URL + '/api/publish', post);
    yield put(postedPublication());
    yield put(clearUserPublication());
    yield put(getUserPublications());
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}

function* getUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_USER_PUBLICATIONS });
    const pubResponse = yield axios.get(BASE_URL + '/api/userpublications', {
      params: action.query
    });
    if (!isEmpty(pubResponse.data)) {
      yield put({ type: FETCHED_USER_PUBLICATIONS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_USER_PUBLICATIONS });
    }

  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}

function* getLikedUsers(action) {
  try {
    yield put({ type: FETCHING_LIKED_USERS });
    const pubResponse = yield axios.get(BASE_URL + '/api/likedby/' + action.id, {
      params: action.query,
    });
    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_LIKED_USERS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_LIKED_USERS });
    }

  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}
function* getPromotedUsers(action) {
  try {
    yield put({ type: FETCHING_PROMOTED_USERS });
    const pubResponse = yield axios.get(BASE_URL + '/api/promotedby/' + action.id, {
      params: action.query,
    });
    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_PROMOTED_USERS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_PROMOTED_USERS });
    }

  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}


function* getOtherUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_OTHER_USER_PUBLICATIONS  });
    const pubResponse = yield axios.get(BASE_URL + '/api/otheruserpublications/'+action.id+'/', {
      params:action.query
    });
    if (!isEmpty(pubResponse.data))  {
      yield put({ type: FETCHED_OTHER_USER_PUBLICATIONS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_OTHER_USER_PUBLICATIONS });
    }

  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}


export function* PublishPostWatcher() {
  yield takeLatest(POST_PUBLICATION, postPublication);
}

export function* UserPublicationWatcher() {
  yield takeLatest(GET_USER_PUBLICATIONS, getUserPublicationsWorker);
}

export function* getLikedUserWatcher() {
  yield takeLatest(FETCH_LIKED_USERS, getLikedUsers);
}
export function* getPromotedUserWatcher() {
  yield takeLatest(FETCH_PROMOTED_USERS, getPromotedUsers);
}
export function* otherUserPublicationWatcher() {
  yield takeLatest(GET_OTHER_USER_PUBLICATIONS, getOtherUserPublicationsWorker);
}