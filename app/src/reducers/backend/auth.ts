import { AuthContext } from '~types/context';
import { AuthContextAction } from '~types/action';
import produce from 'immer';
import ActionType from '~enums/AuthContext';

export const defaultState: AuthContext = {
  username: null,
  roles: [],
  projects: [],
  authMode: null,
  version: null,
  logoutUrl: null,
  authUrl: null,
  apiUrl: null,
  engineAdminUrl: null
};

const auth = (state: AuthContext, { type, context }: AuthContextAction): AuthContext =>
  produce(state, (draft: AuthContext): AuthContext => {
    switch (type) {
      case ActionType.USER_LOAD_SUCCESS: {
        draft.username = context.username;
        draft.roles = context.roles;
        draft.projects = context.projects;
        return draft;
      }
      case ActionType.GENERAL_SETTINGS_LOAD_SUCCESS: {
        draft.authMode = context.authMode;
        draft.version = context.version;
        draft.logoutUrl = context.logoutUrl;
        draft.authUrl = context.authUrl;
        draft.apiUrl = context.apiUrl;
        draft.engineAdminUrl = context.engineAdminUrl;
        return draft;
      }
      case ActionType.URL_LOAD_SUCCESS: {
        draft.url = context.url;
        return draft;
      }
      case ActionType.CLEAR: {
        return defaultState;
      }
      default:
        return draft;
    }
  });

export default auth;
