import { AnyAction } from 'redux';
import { Either, left, right } from '@sweet-monads/either';
import { hideSpinner, showSpinner } from '~actions/common';
import { fetchPost, wrapJson } from '~actions/backend/fetch';
import { checkLocalToken, fetchTokenOk, getToken } from '~actions/backend/request';
import {
  ENDPOINT_NOT_AVAILABLE,
  UNEXPECTED_NOT_JSON_RESULT,
  UNEXPECTED_RESPONSE_STATUS,
  UNKNOWN_COMMUNICATION_PROBLEM
} from '~const/log';
import ActionType from '~enums/Backend';
import { Auth as AuthErrors } from '~enums/Errors';
import { Auth, AuthToken } from '~enums/Routes';
import { AuthTag, TokenAuth } from '~enums/Html';
import { ResponseStatus } from '~enums/Http';
import { SessionAction, ThunkResult } from '~types/action';
import { JsonResponse } from '~types/response';
import { transportNoRouteException } from '~exceptions/TransportNoRouteException';
import { unexpectedException } from '~exceptions/UnexpectedException';
import { SLASH_SIGN } from '~const/common';

export const passwordExpired = (username: string, oldPassword: string): SessionAction => ({
  type: ActionType.PASSWORD_EXPIRED,
  username,
  oldPassword
});

export const changePasswordSuccess = (): SessionAction => ({
  type: ActionType.CHANGE_PASSWORD_SUCCESS
});

export const changePasswordError = (message: string): SessionAction => ({
  type: ActionType.CHANGE_PASSWORD_ERROR,
  message
});

export const changePassword = (
  username: string,
  oldPassword: string,
  newPassword: string
): ThunkResult<void, AnyAction> => async (dispatch) => {
  dispatch(showSpinner());
  const answer = await fetchPost(
    Auth.CHANGE_PASSWORD,
    `${AuthTag.USERNAME}${encodeURIComponent(username)}${AuthTag.OLD_PASSWORD}` +
    `${encodeURIComponent(oldPassword)}${AuthTag.NEW_PASSWORD}${encodeURIComponent(newPassword)}`
  );
  const chain = await answer.mapLeft(() => new Error(UNKNOWN_COMMUNICATION_PROBLEM))
    .asyncChain(async (response): Promise<Either<Error, SessionAction>> => {
      switch (response.status) {
        case ResponseStatus._200:
          return right(changePasswordSuccess());
        case ResponseStatus._401: {
          const jsonAnswer = await wrapJson<JsonResponse>(response);
          return jsonAnswer.mapLeft(() => new Error(UNEXPECTED_NOT_JSON_RESULT))
            .chain((json) => left(new Error(json.errorCode)));
        }
        default:
          return left(new Error(`${UNEXPECTED_RESPONSE_STATUS}${response.status}`));
      }
    });
  dispatch(hideSpinner());
  chain.mapRight((success) => dispatch(success))
    .mapLeft((error) => dispatch(changePasswordError(error.message)));
};

export const loginSuccess = (): SessionAction => ({
  type: ActionType.LOGIN_SUCCESS
});

export const loginError = (message: string): SessionAction => ({
  type: ActionType.LOGIN_ERROR,
  message
});

export const login = (username: string, password: string): ThunkResult<void, AnyAction> => async (dispatch) => {
  dispatch(showSpinner());
  const answer = await fetchPost(
    `${SLASH_SIGN}${SERVER_MODULE_NAME}${AuthToken.GET_ACCESS_TOKEN}`,
    JSON.stringify({ username, password })
  );
  const chain = await answer.mapLeft(() => new Error(UNKNOWN_COMMUNICATION_PROBLEM))
    .asyncChain(async (response): Promise<Either<Error, SessionAction>> => {
      if (response.status === ResponseStatus._200) {
        const token = await dispatch(fetchTokenOk(SERVER_MODULE_NAME, response));
        return token.mapRight(() => loginSuccess()).mapLeft((e) => new Error(e.message));
      }
      const jsonAnswer = await wrapJson<JsonResponse>(response);
      return jsonAnswer.mapLeft(() => new Error(UNEXPECTED_NOT_JSON_RESULT))
        .chain((json) => {
          if (json.errorCode === AuthErrors.PASSWORD_EXPIRED) {
            return right(passwordExpired(username, password));
          }
          return right({ ...json, type: ActionType.LOGIN_ERROR }) as Either<Error, SessionAction>;
        });
    });
  dispatch(hideSpinner());
  chain.mapRight((success) => dispatch(success))
    .mapLeft((error) => dispatch(loginError(error.message)));
};

export const logoutSuccess = (): SessionAction => ({
  type: ActionType.LOGOUT_SUCCESS
});

export const logoutError = (error: Error): SessionAction => ({
  type: ActionType.LOGOUT_ERROR,
  error
});

export const logout = (logoutUrl: string): ThunkResult<void, AnyAction> => async (dispatch) => {
  dispatch({ type: ActionType.LOGOUT });
  const answer = await fetchPost(`${SLASH_SIGN}${SERVER_MODULE_NAME}${logoutUrl || Auth.LOGOUT}`);
  const securityAnswer = await answer.asyncChain(async (response: Response) => {
    switch (response.status) {
      case ResponseStatus._200:
        return await wrapJson(response);
      case ResponseStatus._404:
        return left(transportNoRouteException(ENDPOINT_NOT_AVAILABLE));
      default:
        return left(unexpectedException(`${UNEXPECTED_RESPONSE_STATUS}${response.status}`));
    }
  });
  localStorage.removeItem(TokenAuth.KEY);
  securityAnswer.mapRight(() => {
    dispatch(logoutSuccess());
  }).mapLeft((error) => {
    dispatch(logoutError(new Error(error.message)));
    throw error;
  });
};

export const checkAuth = (logoutUrl: string): ThunkResult<void, AnyAction> => async (dispatch) => {
  dispatch(checkLocalToken(SERVER_MODULE_NAME));
  const token = await dispatch(getToken(SERVER_MODULE_NAME));
  token.mapRight(() => dispatch(loginSuccess()))
    .mapLeft(() => dispatch(logout(logoutUrl)));
};
