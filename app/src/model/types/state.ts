import Thing from './classes/Thing';
import { Dayjs } from 'dayjs';
import { LabeledValue } from 'antd/lib/select';

export type RosterType = 'all' | 'first' | 'second';
export type ValidStatusType = '' | 'error' | 'success' | 'warning' | 'validating';

export interface RosterFilterType {
  [key: string]: Dayjs | string | boolean | RosterType | Array<LabeledValue> | Thing;

  dateStart?: Dayjs;
  dateEnd?: Dayjs;
  rosterNumber?: string;
  rosterType?: RosterType;
  isRosterValidation?: boolean;
  rosterName?: string;
  otherStatus?: Array<LabeledValue>;
  otherThing?: Thing;
}

export interface ValidatorType {
  [key: string]: ValidStatusType | string;

  validateStatus?: ValidStatusType;
  help?: string;
}
