import { RosterFilter, ServerFilter } from '~types/filters';
import Header from '~types/classes/Header';
import { ErrorType, RowsDto } from '~types/dto';
import { ReactNode } from 'react';
import { Either } from '@sweet-monads/either';
import AuthMode from '~enums/AuthMode';

export interface DefaultState {
  [key: string]: unknown;
}

export interface DefaultStringState {
  [key: string]: string;
}

export interface DefaultNumberState {
  [key: string]: number;
}

/**
 * BackendState interfaces
 */

export interface Token extends DefaultState {
  // eslint-disable-next-line camelcase
  access_token: string;
  // eslint-disable-next-line camelcase
  refresh_token: string;
}

export interface AccessState extends DefaultState {
  rights?: string[];
  loading?: boolean;
}

export interface RequestState extends DefaultState {
  authMode: AuthMode;
  token: Token;
  refreshPromise?: Promise<Either<ErrorType, Token>>;
}

export interface SessionState extends DefaultState {
  state: string;
  username?: string;
  oldPassword?: string;
  error?: Error | string;
}

/**
 * CommonState interfaces
 */

export interface SpinnerState extends DefaultState {
  counter: number;
  message?: string;
  timestamp?: number;
}

export interface ModalState extends DefaultStringState {
  layerId?: string;
  title?: string;
  data?: string;
}

export interface CommonDialog extends DefaultState {
  type?: string;
  index?: number;
  title?: string;
  message?: ReactNode;
  okLabel?: string;
  cancelLabel?: string;
  details?: string;
}

export interface PromiseDialog extends CommonDialog {
  resolve: Promise<Response>;
  reject: Promise<void>;
}

/**
 * ModuleState interfaces
 */

export interface PageableState extends DefaultState {
  totalRecords: number;
  pageSizeOptions: string[];
  serverFilter: ServerFilter;
  tableHeaders?: Header[]
}

export interface SortableState extends DefaultState {
  sortKey?: string;
  sortType?: string;
}

export interface BreadcrumbState extends DefaultStringState {
  title: string;
  link: string;
}

export interface RostersState extends PageableState, SortableState {
  data?: RowsDto[];
  searchFilter?: RosterFilter;
}

/**
 * Summary interfaces
 */

export interface BackendState extends DefaultState {
  access?: AccessState;
  request?: RequestState;
  session?: SessionState;
}

export interface CommonState extends DefaultState {
  spinner?: number;
  spinnerMessage?: string;
  spinnerTimestamp?: number;
  spinners?: Record<string, SpinnerState>;
  background?: boolean;
  modals?: ModalState[];
  dialogs?: PromiseDialog[]
}

export interface ModuleState extends DefaultState {
  breadcrumbs?: BreadcrumbState[];
  rosters?: RostersState;
}
