import { RequestState } from '~types/state';
import { RequestAction } from '~types/action';
import produce from 'immer';
import ActionType from '~enums/Backend';

export const initialState: RequestState = {
  tokens: {
    [SERVER_MODULE_NAME]: {
      token: null,
      validUntil: null,
      promise: null
    }
  }
};

const request = (state: RequestState = initialState, action: RequestAction): RequestState =>
  produce(state, (draft: RequestState): RequestState => {
    switch (action.type) {
      case ActionType.GET_TOKEN: {
        draft.tokens = {
          ...state.tokens,
          [action.moduleId]: {
            ...state.tokens && state.tokens[action.moduleId],
            promise: action.promise
          }
        };
        return draft;
      }
      case ActionType.GET_TOKEN_SUCCESS: {
        draft.tokens = {
          ...state.tokens,
          [action.moduleId]: {
            ...state.tokens && state.tokens[action.moduleId],
            token: action.csrfToken.token,
            validUntil: action.csrfToken.validUntil,
            promise: null
          }
        };
        return draft;
      }
      case ActionType.GET_TOKEN_ERROR: {
        draft.tokens = {
          ...state.tokens,
          [action.moduleId]: {
            ...state.tokens && state.tokens[action.moduleId],
            token: null,
            validUntil: null,
            promise: null
          }
        };
        return draft;
      }
      default:
        return draft;
    }
  });

export default request;
