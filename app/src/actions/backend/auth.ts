import * as backend from '~actions/backend';

import { AuthContextAction, ThunkResult } from '~types/action';
import { Either } from '@sweet-monads/either';
import { ErrorType } from '~types/dto';
import { UserInfoResponse, UserRightsResponse } from '~types/response';
import { AnyAction } from 'redux';
import { userApi } from '~dictionaries/backend';
import ActionType from '~enums/AuthContext';

export const loadUser = ({ version, login, roles, ip, name, middleName, lastName, email }: UserInfoResponse):
  AuthContextAction => ({
  type: ActionType.USER_LOAD_SUCCESS,
  context: {
    version,
    login,
    roles,
    ip,
    name,
    middleName,
    lastName,
    email
  }
});

export const loadRights = (rights: string[]): AuthContextAction =>
  ({ type: ActionType.RIGHTS_LOAD_SUCCESS, context: { rights } });

export const loadUrl = (isClient: boolean): AuthContextAction => ({
  type: ActionType.URL_LOAD_SUCCESS, context: {
    url: isClient ? window.location.origin : null
  }
});

export const clearAuthContext = (): AuthContextAction => ({ type: ActionType.CLEAR });

export const getRights = (): ThunkResult<Promise<Either<ErrorType, UserRightsResponse>>, AnyAction> => (dispatch) =>
  dispatch(backend.executeRequest(userApi.rights));

export const getUser = (): ThunkResult<Promise<Either<ErrorType, UserInfoResponse>>, AnyAction> => (dispatch) =>
  dispatch(backend.executeRequest(userApi.get));
