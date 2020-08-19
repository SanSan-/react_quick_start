import { AnyAction, CombinedState, combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'connected-react-router';
import backend from './backend';
import common from './common';
import module from './module';

import ActionType from '~enums/Backend';
import { GeneralState } from '~types/store';
import { SLASH_SIGN } from '~const/common';

const appReducers = combineReducers({
  backend,
  common,
  module
});

const reducers = (state: GeneralState, action: AnyAction): CombinedState<GeneralState> => {
  if (action.type === ActionType.LOGOUT || action.type === ActionType.LOGOUT_SUCCESS) {
    // eslint-disable-next-line no-undefined
    return appReducers(undefined, action);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (action.type === LOCATION_CHANGE && action.payload.location.pathname === SLASH_SIGN) {
    const newState = { ...state, module: {} };
    return appReducers(newState, action);
  }
  return appReducers(state, action);
};

export default reducers;
