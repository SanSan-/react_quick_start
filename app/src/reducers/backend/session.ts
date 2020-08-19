import { SessionState } from '~types/state';
import LoginState from '~enums/LoginState';
import { SessionAction } from '~types/action';
import produce from 'immer';
import ActionType from '~enums/Backend';
import { PASSWORD_CHANGED_SUCCESSFUL, PASSWORD_EXPIRED } from '~const/log';

export const initialState: SessionState = {
  state: LoginState.UNKNOWN,
  error: null,
  username: null
};

const session = (state: SessionState = initialState, action: SessionAction): SessionState =>
  produce(state, (draft: SessionState): SessionState => {
    switch (action.type) {
      case ActionType.PASSWORD_EXPIRED: {
        draft.username = action.username;
        draft.state = LoginState.PASSWORD_EXPIRED;
        draft.error = PASSWORD_EXPIRED;
        return draft;
      }
      case ActionType.CHANGE_PASSWORD_SUCCESS: {
        draft.state = LoginState.LOGGED_OUT;
        draft.error = PASSWORD_CHANGED_SUCCESSFUL;
        return draft;
      }
      case ActionType.CHANGE_PASSWORD_ERROR: {
        draft.state = LoginState.PASSWORD_EXPIRED;
        draft.error = action.message;
        return draft;
      }
      case ActionType.LOGIN_SUCCESS: {
        draft.state = LoginState.LOGGED_IN;
        return draft;
      }
      case ActionType.LOGIN_ERROR: {
        draft.state = LoginState.LOGGED_OUT;
        draft.error = action.message;
        return draft;
      }
      case ActionType.LOGOUT:
      case ActionType.LOGOUT_SUCCESS: {
        draft.state = LoginState.LOGGED_OUT;
        return draft;
      }
      default:
        return draft;
    }
  });

export default session;
