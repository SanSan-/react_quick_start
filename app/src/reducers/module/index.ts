import { combineReducers } from 'redux';

import breadcrumbs from './breadcrumbs';
import rosters from './rosters';

export default combineReducers({
  breadcrumbs,
  rosters
});
