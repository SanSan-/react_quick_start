import { AnyAction } from 'redux';
import { DefaultDispatch } from '~types/store';
import { GetStateAction } from '~types/action';
import { DefaultNumberState, DefaultState, DefaultStringState } from '~types/state';

export interface ExceptionType extends DefaultStringState {
  errorType?: string;
  message?: string;
  originalStackTrace?: string;
}

export interface ErrorResponse extends ExceptionType {
  moduleId?: string;
  errorId?: string;
  originalMessage?: string;
}

export type ErrorType = ExceptionType | Error | unknown;
export type Spinner = string | boolean;

export type SpinnerShowCallback = (id?: string, message?: string) => AnyAction;
export type SpinnerHideCallback = (id?: string, force?: boolean) => (
  dispatch: DefaultDispatch, getState: GetStateAction
) => void;

export interface Pagination extends DefaultNumberState {
  pageNum?: number;
  pageSize?: number;
  totalRecords?: number;
}

export interface RowsDto extends DefaultStringState {
  rowName?: string;
  rowAccount?: string;
  rowDate?: string;
}

export interface ActionResponse extends DefaultState {
  objectId?: string;
  isSuccess?: boolean;
  message?: string;
}
