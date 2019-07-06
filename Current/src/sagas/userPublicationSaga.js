import axios from 'axios';
import { takeLatest,put } from 'redux-saga/effects';

import Attachment from '../components/generic/Attachment';
import { getUserPublications } from '../actions/userPublicationAction';
import { BASE_URL } from '../app.constants';
import {
  ERROR_OCCUR,
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  FETCHING_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
} from '../actions/types';

// posting user publication saga
function* postPublication(action) {
  try {
    const { attachment, text, workType, accessType, publicationType } = action.data;
    const isImage = attachment && Attachment.isImage(attachment);
    const isVideo = attachment && !isImage && Attachment.isVideo(attachment);
    const isDocument = attachment && !isImage && !isVideo;

    const params = {
      posts: attachment,
      'publication_img': isImage ? '1' : '0',
      'publication_vid': isVideo ? '1' : '0',
      'publication_doc': isDocument ? '1' : '0',
      'publication_txt': text,
      'work_type': workType ? workType.id : null,
      'access': accessType ? accessType.id : 1,
      'publication_type': publicationType === 'work' ? 2 : 1,
    };

    let post = params;
    if (params.posts) {
      // if there's an attachment - send form-data request
      post = new FormData();
      Object.keys(params).forEach(param => post.append(param, params[param]));
    }

    yield axios.post(BASE_URL + '/api/publish', post);
    yield put(getUserPublications());
  } catch (error) {
    yield put({ type: ERROR_OCCUR, payload: { message: 'Something went wrong. Please try again later' } });
  }
}

function* getUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_USER_PUBLICATIONS });
    const pubResponse = yield axios.get(BASE_URL + '/api/userpublications', {
      params: action.query ? action.query(action) : null,
    });
    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_USER_PUBLICATIONS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_USER_PUBLICATIONS });
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