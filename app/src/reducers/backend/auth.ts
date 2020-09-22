import { AuthContext } from '~types/context';
import { AuthContextAction } from '~types/action';
import produce from 'immer';
import ActionType from '~enums/AuthContext';

export const defaultState: AuthContext = {
  version: null,
  login: null,
  roles: null,
  rights: [],
  url: null,
  ip: null,
  name: null,
  lastName: null,
  middleName: null,
  email: null
};

const auth = (state: AuthContext, { type, context }: AuthContextAction): AuthContext =>
  produce(state, (draft: AuthContext): AuthContext => {
    switch (type) {
      case ActionType.USER_LOAD_SUCCESS: {
        draft.version = context.version;
        draft.login = context.login;
        draft.roles = context.roles;
        draft.ip = context.ip;
        draft.name = context.name;
        draft.lastName = context.lastName;
        draft.middleName = context.middleName;
        draft.email = context.email;
        return draft;
      }
      case ActionType.RIGHTS_LOAD_SUCCESS: {
        draft.rights = context.rights;
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
