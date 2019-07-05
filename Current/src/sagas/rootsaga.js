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
import { GetWorkTypesWatcher } from './workTypeSaga';
import { GetAccessTypesWatcher } from './accessTypeSaga';

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
    GetWorkTypesWatcher(),
    GetAccessTypesWatcher(),
  ]);
}