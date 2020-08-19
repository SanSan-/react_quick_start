import { AnyAction } from 'redux';
import { Either, left, right } from '@sweet-monads/either';
import { hideSpinner, showSpinner } from '~actions/common';
import { fetchPost, wrapJson } from '~actions/backend/fetch';
import { getToken } from '~actions/backend/request';
import {
  ENDPOINT_NOT_AVAILABLE,
  UNEXPECTED_NOT_JSON_RESULT,
  UNEXPECTED_RESPONSE_STATUS,
  UNKNOWN_COMMUNICATION_PROBLEM
} from '~const/log';
import ActionType from '~enums/Backend';
import { Auth as AuthErrors } from '~enums/Errors';
import { Auth } from '~enums/Routes';
import { AuthTag } from '~enums/Html';
import { ResponseStatus } from '~enums/Http';
import { SessionAction, ThunkResult } from '~types/action';
import { JsonResponse } from '~types/response';
import { transportNoRouteException } from '~exceptions/TransportNoRouteException';
import { unexpectedException } from '~exceptions/UnexpectedException';

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
    Auth.LOGIN,
    `${AuthTag.USERNAME}${encodeURIComponent(username)}${AuthTag.PASSWORD}${encodeURIComponent(password)}`
  );
  const chain = await answer.mapLeft(() => new Error(UNKNOWN_COMMUNICATION_PROBLEM))
    .asyncChain(async (response): Promise<Either<Error, SessionAction>> => {
      if (response.status === ResponseStatus._200) {
        return right(loginSuccess());
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

export const logout = (): ThunkResult<void, AnyAction> => async (dispatch) => {
  dispatch({ type: ActionType.LOGOUT });
  const answer = await fetchPost(Auth.LOGOUT);
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
  securityAnswer.mapRight(() => {
    dispatch(logoutSuccess());
  }).mapLeft((error) => {
    dispatch(logoutError(new Error(error.message)));
    throw error;
  });
};

export const checkAuth = (): ThunkResult<void, AnyAction> => (dispatch) => dispatch(getToken(SERVER_MODULE_NAME))
  .then((token: Either<unknown, unknown>) => token.mapRight(() => dispatch(loginSuccess()))
    .mapLeft(() => dispatch(logout())));
