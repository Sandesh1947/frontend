import { combineReducers } from 'redux';
import LoginStateReducer from './loginReducer'
export default combineReducers({
    logindata: LoginStateReducer,
})