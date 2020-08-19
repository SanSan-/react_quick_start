import {
  BreadcrumbState,
  CommonDialog,
  NotificationType,
  PromiseDialog,
  PushListener,
  PushState,
  Token
} from '~types/state';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GeneralState } from '~types/store';
import { AuthContext } from '~types/context';
import { Pagination, RowsDto, Spinner } from '~types/dto';
import { RosterFilter } from '~types/filters';

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
}

export interface PushAction extends AnyAction {
  notificationId?: string;
  notificationSessionId?: string;
  dto?: PushState;
  data?: NotificationType;
  listener?: PushListener;
}

export interface RequestAction extends AnyAction {
  moduleId: string;
  csrfToken?: Token;
  promise?: Response;
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

export interface CommonDialogAction extends AnyAction, CommonDialog {
}

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
