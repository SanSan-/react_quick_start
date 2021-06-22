import { RosterFilter, ServerFilter } from '~types/filters';
import Header from '~types/classes/Header';
import { ErrorType, ExceptionType, RowsDto } from '~types/dto';
import { ReactNode } from 'react';
import { Either } from '@sweet-monads/either';

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

export interface Listener<T> {
  (notification: T): void;
}

export interface NotificationType extends DefaultState {
  type?: string;
  requestId?: string;
  data?: unknown;
  error?: ExceptionType;
}

export type PushListener = Listener<NotificationType>;

export interface Token extends DefaultState {
  token: string;
  validUntil: number;
  promise?: Promise<Either<ErrorType, string>>
}

export interface AccessState extends DefaultState {
  rights?: string[];
  loading?: boolean;
}

export interface PushState extends DefaultState {
  sessionId?: string;
  eTag?: string;
  notifications?: Record<string, NotificationType>;
  notificationIds?: string[];
  listeners?: PushListener[];
}

export interface RequestState extends DefaultState {
  tokens: Record<string, Token>;
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
  push?: PushState;
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
