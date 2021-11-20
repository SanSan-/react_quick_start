import { AnyAction } from 'redux';
import { Either, left, right } from '@sweet-monads/either';
import { hideSpinner, showResponseError, showSpinner } from '~actions/common';
import { fetchPost, wrapJson } from '~actions/backend/fetch';
import { UNAUTHENTICATED_ANSWER } from '~const/settings';
import ActionType from '~enums/Backend';
import Exceptions from '~enums/Exceptions';
import { ContentType, DispositionType, Headers, ResponseStatus } from '~enums/Http';
import { AuthToken, ControllerPath } from '~enums/Routes';
import Type from '~enums/Types';
import ResultStatus from '~enums/ResultStatus';
import { AsyncOptions, GetStateAction, RequestAction, ThunkResult } from '~types/action';
import { ErrorResponse, ErrorType, ExceptionType, Spinner, SpinnerHideCallback, SpinnerShowCallback } from '~types/dto';
import { Token } from '~types/state';
import { AnyResponse } from '~types/response';
import { DefaultDispatch } from '~types/store';
import AccessDeniedException, { accessDeniedException } from '~exceptions/AccessDeniedException';
import ApplicationException, { applicationException } from '~exceptions/ApplicationException';
import JsonParsingException, { jsonParsingException } from '~exceptions/JsonParsingException';
import TimeoutException from '~exceptions/TimeoutException';
import TransportNoRouteException, { transportNoRouteException } from '~exceptions/TransportNoRouteException';
import UnexpectedException from '~exceptions/UnexpectedException';
import UnknownCommunicationException from '~exceptions/UnknownCommunicationException';
import { isEmpty } from '~utils/CommonUtils';
import { logoutSuccess } from '~actions/backend/session';
import {
  ACCESS_DENIED,
  ENDPOINT_NOT_AVAILABLE,
  INCORRECT_SERVER_RESULT,
  LOCAL_STORAGE_GET_ITEM_ERROR,
  LOCAL_STORAGE_IS_EMPTY,
  LOCAL_STORAGE_PARSE_ERROR,
  LOCAL_STORAGE_TO_JSON,
  LOGGED_OUT,
  UNEXPECTED_RESPONSE_STATUS,
  UNKNOWN_RESULT
} from '~const/log';
import SilentException from '~exceptions/SilentException';
import { AMPERSAND_SIGN, EMPTY_ACTION, EQUAL_SIGN, SLASH_SIGN, SPACE_SIGN, ZERO_SIGN } from '~const/common';
import AuthMode from '~enums/AuthMode';
import { isNotExpired } from '~utils/BackendUtils';
import saveAs from 'file-saver';
import { TokenAuth } from '~enums/Html';

export const defaultOptions: AsyncOptions = {
  controllerPath: ControllerPath.INVOKE,
  moduleId: SERVER_MODULE_NAME,
  spinner: true
};

const processSpinner = (
  spinner: Spinner,
  callback: SpinnerShowCallback | SpinnerHideCallback
): ThunkResult<unknown, AnyAction> => (dispatch) => {
  if (typeof spinner === Type.STRING) {
    return dispatch(callback(spinner as string));
  } else if (spinner === true) {
    return dispatch(callback());
  }
};

export const processStart = (spinner: Spinner): ThunkResult<void, AnyAction> => processSpinner(spinner, showSpinner);
export const processEnd = (spinner: Spinner): ThunkResult<void, AnyAction> => processSpinner(spinner, hideSpinner);

export const handleErrorJson = (
  error: ExceptionType,
  unknownResultCallback?: () => Either<ErrorType, unknown>
): Either<ErrorType, unknown> => {
  switch (error.errorType) {
    case Exceptions.ACCESS_DENIED_EXCEPTION: {
      return left(new AccessDeniedException(error));
    }
    case Exceptions.APPLICATION_EXCEPTION: {
      return left(new ApplicationException(error));
    }
    case Exceptions.JSON_PARSING_EXCEPTION: {
      return left(new JsonParsingException(error));
    }
    case Exceptions.TIMEOUT_EXCEPTION: {
      return left(new TimeoutException(error));
    }
    case Exceptions.TRANSPORT_NO_ROUTE_EXCEPTION: {
      return left(new TransportNoRouteException(error));
    }
    case Exceptions.UNEXPECTED_EXCEPTION: {
      return left(new UnexpectedException(error));
    }
    case Exceptions.UNKNOWN_COMMUNICATION_EXCEPTION: {
      return left(new UnknownCommunicationException(error));
    }
    default: {
      return unknownResultCallback();
    }
  }
};

const tokenSuccess = (moduleId: string, token: Token): RequestAction => ({
  type: ActionType.GET_TOKEN_SUCCESS,
  moduleId,
  token
});

const tokenError = (moduleId: string, error: string): RequestAction => ({
  type: ActionType.GET_TOKEN_ERROR,
  moduleId,
  error
});

export const fetchTokenOk = (
  moduleId: string, response: Response) => async (dispatch: DefaultDispatch): Promise<Either<ErrorType, Token>> => {
  const contentType = response.headers.get(Headers.CONTENT_TYPE);
  if (contentType === UNAUTHENTICATED_ANSWER) {
    localStorage.removeItem(TokenAuth.KEY);
    dispatch(tokenError(moduleId, UNAUTHENTICATED_ANSWER));
    return left(applicationException(UNAUTHENTICATED_ANSWER));
  }
  const json = await wrapJson<Token>(response);
  return json.mapRight((token): Token => {
    localStorage.setItem(TokenAuth.KEY, JSON.stringify(token));
    dispatch(tokenSuccess(moduleId, token));
    return token;
  }).mapLeft((error: ErrorResponse) => {
    localStorage.removeItem(TokenAuth.KEY);
    dispatch(tokenError(moduleId, error.message));
    return error;
  });
};

export const fetchToken = (moduleId: string) => async (dispatch: DefaultDispatch, getState: GetStateAction):
  Promise<Either<ErrorType, Token>> => {
  const { token, refreshPromise } = getState().app.backend.request;
  if (!isEmpty(refreshPromise)) {
    return refreshPromise;
  }
  const answer = await fetchPost(`${SLASH_SIGN}${moduleId}${AuthToken.GET_REFRESH_TOKEN}`, JSON.stringify({
    refresh_token: token.refresh_token
  }));
  return answer.mapLeft((error: ExceptionType) => {
    localStorage.removeItem(TokenAuth.KEY);
    dispatch(tokenError(moduleId, error.message));
    return error;
  }).asyncChain(async (response: Response) => {
    switch (response.status) {
      case ResponseStatus._200:
        return await dispatch(fetchTokenOk(moduleId, response));
      case ResponseStatus._401: {
        localStorage.removeItem(TokenAuth.KEY);
        dispatch(logoutSuccess());
        dispatch(tokenError(moduleId, LOGGED_OUT));
        return left(new SilentException());
      }
      case ResponseStatus._403:
        return left(accessDeniedException(ACCESS_DENIED));
      case ResponseStatus._404:
        return left(transportNoRouteException(ENDPOINT_NOT_AVAILABLE));
      default:
        return left(new Error(`${UNEXPECTED_RESPONSE_STATUS}${response.status}`));
    }
  });
};

export const getLocalToken = (): Either<ErrorType, Token> => {
  const localToken = localStorage.getItem(TokenAuth.KEY);
  if (!isEmpty(localToken)) {
    try {
      const token = JSON.parse(localToken) as Token;
      return right(token);
    } catch (_e) {
      return left(jsonParsingException(`${LOCAL_STORAGE_PARSE_ERROR}${TokenAuth.KEY}${LOCAL_STORAGE_TO_JSON}`));
    }
  }
  return left(new Error(`${LOCAL_STORAGE_GET_ITEM_ERROR}${TokenAuth.KEY}${LOCAL_STORAGE_IS_EMPTY}`));
};

export const checkLocalToken = (moduleId: string) => (dispatch: DefaultDispatch): void => {
  const localToken = getLocalToken();
  localToken.mapRight((tok) => {
    dispatch(tokenSuccess(moduleId, tok));
  });
};

export const getToken = (moduleId: string) => async (dispatch: DefaultDispatch, getState: GetStateAction):
  Promise<Either<ErrorType, Token>> => {
  const { token, authMode } = getState().app.backend.request;
  if (![AuthMode.DEV, AuthMode.KEYCLOAK].includes(authMode)) {
    return right(null);
  }
  if (token && isNotExpired(token.access_token)) {
    return right(token);
  }
  if (token && isNotExpired(token.refresh_token)) {
    return dispatch(fetchToken(moduleId));
  }
  localStorage.removeItem(TokenAuth.KEY);
  dispatch(logoutSuccess());
  dispatch(tokenError(moduleId, LOGGED_OUT));
  return left(new SilentException());
};

const executeRequestOk = (response: Response, requestOptions: AsyncOptions):
  ThunkResult<Promise<Either<ErrorType, AnyResponse | unknown>>, AnyAction> => async (dispatch) => {
  const contentType = response.headers.get(Headers.CONTENT_TYPE);
  const disposition = response.headers.get(Headers.CONTENT_DISPOSITION);
  if (contentType && contentType.startsWith(ContentType.HTML)) {
    return left(applicationException(UNAUTHENTICATED_ANSWER));
  }
  if (response.headers.get(Headers.CONTENT_LENGTH) === ZERO_SIGN) {
    return right(null);
  }
  if (requestOptions.controllerPath === ControllerPath.DOWNLOAD) {
    return right(response);
  }
  if (disposition && disposition.indexOf(DispositionType.ATTACHMENT) !== -1) {
    const text = await response.text();
    const startIndex = disposition.indexOf(Headers.FILENAME) + Headers.FILENAME.length;
    const endIndex = disposition.length;
    const fileName = disposition.substring(startIndex, endIndex);
    saveAs(new File([text], fileName, { type: ContentType.PLAIN }), fileName);
    return right(null);
  }
  const json = await wrapJson<AnyResponse>(response);
  return json.mapRight((answer) => {
    if (answer && answer.responseStatus === ResultStatus.FATAL) {
      dispatch(showResponseError(answer));
    }
    return answer;
  });
};

const handleErrorResponse = (response: Response, text: string): Either<ErrorType, unknown> => {
  const handleUnknownResult = (): Either<ErrorType, unknown> => {
    // eslint-disable-next-line no-console
    console.error(`${UNKNOWN_RESULT}${text}`);
    return left(new Error(`${INCORRECT_SERVER_RESULT}${response.status}${SPACE_SIGN}${response.statusText}`));
  };
  if (response.status >= ResponseStatus._400 && response.status <= ResponseStatus._599) {
    let json;
    try {
      json = JSON.parse(text) as ExceptionType;
    } catch (_e) {
      return handleUnknownResult();
    }
    return handleErrorJson(json, handleUnknownResult);
  }
  return handleUnknownResult();
};

const fetchRequest = (endpoint: string, body: string, options: AsyncOptions):
  ThunkResult<Promise<Either<ErrorType, AnyResponse | unknown>>, AnyAction> => async (dispatch) => {
  const answer = await fetchPost(endpoint, body, options.headers);
  return answer.asyncChain(async (response) => {
    switch (response.status) {
      case ResponseStatus._200:
        return await dispatch(executeRequestOk(response, options));
      case ResponseStatus._401: {
        dispatch(logoutSuccess());
        return left(logoutSuccess());
      }
      case ResponseStatus._403:
        return left(accessDeniedException(ACCESS_DENIED));
      case ResponseStatus._404:
        return left(transportNoRouteException(ENDPOINT_NOT_AVAILABLE));
      default: {
        const text = await response.text();
        return handleErrorResponse(response, text);
      }
    }
  });
};

export const executeRequest = <T extends AnyResponse> (
  endpointId: string,
  parameters?: Record<string, unknown>,
  options: AsyncOptions = null
): ThunkResult<Promise<Either<ErrorType, T>>, AnyAction> => async (dispatch) => {
    const requestOptions = { ...defaultOptions, ...options };
    const moduleId = requestOptions.moduleId || SERVER_MODULE_NAME;
    dispatch(processStart(requestOptions.spinner));
    dispatch(checkLocalToken(moduleId));
    const jwtToken: Either<ErrorType, Token> = await dispatch(getToken(moduleId));
    return jwtToken.mapLeft((error) => {
      dispatch(processEnd(requestOptions.spinner));
      throw error;
    }).asyncChain(async (token: Token): Promise<Either<ErrorType, T>> => {
      const body = Object.keys(parameters).map((key: string): string =>
        `${encodeURIComponent(key)}${EQUAL_SIGN}${encodeURIComponent(JSON.stringify(parameters[key]))}`
      ).join(AMPERSAND_SIGN);
      const endpoint = `${requestOptions.controllerPath}${moduleId}${SLASH_SIGN}${endpointId}`;
      const response = await dispatch(fetchRequest(endpoint, body,
        {
          ...requestOptions, headers: {
            Authorization: `${Headers.BEARER}${SPACE_SIGN}${token && token.access_token}`
          }
        }
      )) as Either<ErrorType, T>;
      dispatch(processEnd(requestOptions.spinner));
      return response.mapLeft((error) => {
        throw error;
      });
    });
  };

export const wrapResponse = (response: AnyResponse, successAction: AnyAction, errorAction = EMPTY_ACTION):
  ThunkResult<void, AnyAction> => (dispatch) => {
  if (response.responseStatus !== ResultStatus.SUCCESS) {
    dispatch(showResponseError(response));
    if (response.responseStatus === ResultStatus.WARNING) {
      dispatch(successAction);
    } else {
      dispatch(errorAction);
    }
  } else {
    dispatch(successAction);
  }
};
