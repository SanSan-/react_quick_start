import { combineReducers } from 'redux';
import push from './push';
import request from './request';
import session from './session';

export default combineReducers({
  push,
  request,
  session
});
