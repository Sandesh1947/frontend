import { takeLatest, call, put } from 'redux-saga/effects';
import axios from "axios";
import { BASE_URL } from '../app.constants';
//this is for testing with mock
function sampleLogin() {
    return 'sfgsdfgsdfg'
}
function callLoginApi(data) {
    return  axios.post(BASE_URL+'/api/authenticate/',data)
}
function* Login(action) {
    try {
        // let loginResponse = yield call(callLoginApi,action.data)
        // yield localStorage.setItem('AUTH_TOKEN', loginResponse.AUTH_TOKEN);
        // yield put({ type: 'LOGIN_COMPLETED', payload:loginResponse});
        //this is for testing with mock should component sampleLogin and uncommnet above statement once testing with real api
        let loginResponse = yield sampleLogin()
        yield localStorage.setItem('AUTH_TOKEN', loginResponse);
        yield put({ type: 'LOGIN_COMPLETED', payload:loginResponse});
    }
    catch(error) {
        yield put({ type: 'ERROR_OCCUR', payload: {  message : 'Something went wrong.Please try again later' }});
      }
}
export function* LoginWatcher() {
    yield takeLatest('LOGIN', Login);
  }