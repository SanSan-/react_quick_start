import { BreadcrumbState, CommonDialog, PromiseDialog, Token } from '~types/state';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GeneralState } from '~types/store';
import { AuthContext } from '~types/context';
import { ActionResponse, ErrorType, Pagination, RowsDto, Spinner } from '~types/dto';
import { RosterFilter } from '~types/filters';
import { Either } from '@sweet-monads/either';

export interface GetStateAction {
  (): GeneralState;
}

export type ThunkResult<R, T extends AnyAction> = ThunkAction<R, GeneralState, unknown, T>;

/**
 * Backend action interfaces
 */

export interface ContextAction<T> extends AnyAction {
  context?: T;
}

export type AuthContextAction = ContextAction<AuthContext>;

export interface AsyncAction {
  moduleId?: string;
  spinner?: Spinner;
}

export interface AsyncOptions extends AsyncAction {
  controllerPath?: string;
  headers?: Record<string, unknown>;
}

export interface RequestAction extends AnyAction {
  moduleId: string;
  token?: Token;
  promise?: Promise<Either<ErrorType, Token>>;
  error?: string;
}

export interface SessionAction extends AnyAction {
  username?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  message?: string;
  error?: Error;
}

/**
 * Common action interfaces
 */

export interface CommonAction extends AnyAction {
  id?: string;
  index?: number;
  force?: boolean;
  layerId?: string;
  title?: string;
  data?: string;
  message?: string;
  payload?: CommonDialog | PromiseDialog;
}

/**
 * Common action interfaces
 */

export interface BreadcrumbAction extends AnyAction {
  value: BreadcrumbState;
  payload?: Window;
}

export interface RosterAction extends AnyAction {
  rosters?: RowsDto[];
  filter?: RosterFilter;
  pagination?: Pagination;
  sortKey?: string;
  sortType?: string;
}

export interface SendActionResponseAction extends AnyAction {
  responses?: ActionResponse[]
}

export interface SaveFileResponseAction extends SendActionResponseAction {
  binaryData?: number[];
  fileName?: string;
}
