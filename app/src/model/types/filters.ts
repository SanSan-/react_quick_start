import { DefaultNumberState } from '~types/state';

export interface ServerFilter extends DefaultNumberState {
  pageNum: number;
  pageSize: number;
}

export type RosterType = 'all' | 'first' | 'second';
export type ValidStatus = '' | 'error' | 'success' | 'warning' | 'validating';

export interface RosterFilter {
  [key: string]: string | string[] | boolean | RosterType;

  dateStart?: string;
  dateEnd?: string;
  rosterNumber?: string;
  rosterType?: RosterType;
  isRosterValidation?: boolean;
  rosterName?: string;
  selected?: string[];
  otherThing?: string[];
}

export interface Validator {
  [key: string]: ValidStatus | string;

  validateStatus?: ValidStatus;
  help?: string;
}

export interface SearchBuffer<T extends RosterFilter> {
  [key: string]: T | Record<string, Validator>

  filter?: T;
  validators?: Record<string, Validator>
}
