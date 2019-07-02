import { all } from 'redux-saga/effects';
import { LoginWatcher } from './loginSaga';
import {
  userInfoWatcher,
  userPublicationWatcher,
  userFollowerWatcher,
  publishPostWatcher,
  userPartnerWatcher,
} from './userActionSaga';
import { LikePublicationWatcher, PromotePublicationWatcher } from './userPublicationSaga';

export default function* rootSaga() {
  yield all([
    LoginWatcher(),
    userInfoWatcher(),
    userPublicationWatcher(),
    userFollowerWatcher(),
    publishPostWatcher(),
    userPartnerWatcher(),
    LikePublicationWatcher(),
    PromotePublicationWatcher(),
  ]);
}