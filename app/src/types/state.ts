import Thing from '~dictionaries/Thing';
import moment from 'moment';
import { LabeledValue } from 'antd/lib/select';

export type RosterType = 'all' | 'first' | 'second';
export type ValidStatusType = '' | 'error' | 'success' | 'warning' | 'validating';

export interface RosterFilterType {
  [key: string]: moment.Moment | string | boolean | RosterType | Array<LabeledValue> | Thing;

  dateStart?: moment.Moment;
  dateEnd?: moment.Moment;
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
