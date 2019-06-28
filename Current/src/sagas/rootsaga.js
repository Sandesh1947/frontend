import { all } from 'redux-saga/effects';
import {LoginWatcher} from './loginSaga'
import {userInfoWatcher,userPublicationWatcher,userFollowerWatcher} from './userActionSaga'
export default function* rootSaga() {
    yield all([
        LoginWatcher(),
        userInfoWatcher(),
        userPublicationWatcher(),
        userFollowerWatcher()

    ]);
  }