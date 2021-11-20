import { RequestState } from '~types/state';
import { RequestAction } from '~types/action';
import produce from 'immer';
import ActionType from '~enums/Backend';
import AuthMode from '~enums/AuthMode';

export const initialState: RequestState = {
  token: null,
  authMode: AuthMode.DEV,
  refreshPromise: null
};

const request = (state: RequestState = initialState, action: RequestAction): RequestState =>
  produce(state, (draft: RequestState): RequestState => {
    switch (action.type) {
      case ActionType.GET_TOKEN: {
        draft.token = action.token;
        draft.refreshPromise = action.promise;
        return draft;
      }
      case ActionType.GET_TOKEN_SUCCESS: {
        draft.token = action.token;
        draft.refreshPromise = null;
        return draft;
      }
      case ActionType.GET_TOKEN_ERROR: {
        draft.token = null;
        draft.refreshPromise = null;
        return draft;
      }
      default:
        return draft;
    }
  });

export default request;
