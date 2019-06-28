import { all } from 'redux-saga/effects';
import {LoginWatcher} from './loginSaga'

export default function* rootSaga() {
    yield all([
        LoginWatcher()

    ]);
  }