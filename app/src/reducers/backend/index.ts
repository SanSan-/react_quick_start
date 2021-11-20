import { combineReducers } from 'redux';
import request from './request';
import session from './session';

export default combineReducers({
  request,
  session
});
