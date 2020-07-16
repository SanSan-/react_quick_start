import Status from '~dictionaries/Status';
import Thing from '~dictionaries/Thing';
import { EMPTY_STRING } from '~const/common';
import { RosterFilterType, RosterType, ValidatorType } from '~types/state';

export const statusFilter = [
  new Status('1', 'Status 1'),
  new Status('2', 'Status 2'),
  new Status('3', 'Status 3'),
  new Status('4', 'Status 4'),
  new Status('5', 'Status 5'),
  new Status('6', 'Status 6'),
  new Status('7', 'Status 7'),
  new Status('8', 'Status 8')
];

export const thingsFilter = [
  new Thing('all', 'All', []),
  new Thing('sec1', 'Section 1', ['0', '3']),
  new Thing('th0', 'Thing 0', ['0']),
  new Thing('th3', 'Thing 3', ['3']),
  new Thing('sec2', 'Section 2', ['4', '5']),
  new Thing('th4', 'Thing 4', ['4']),
  new Thing('th5', 'Thing 5', ['5'])
];

export const typesFilter: Array<RosterType> = [
  'all',
  'first',
  'second'
];

export const defaultFilter: RosterFilterType = {
  dateStart: null,
  dateEnd: null,
  rosterNumber: null,
  rosterType: typesFilter[0],
  isRosterValidation: null,
  rosterName: null,
  otherStatus: [],
  otherThing: thingsFilter[0]
};

export const defaultValidators: Record<string, ValidatorType> = {
  rosterNumber: {
    validateStatus: null,
    help: EMPTY_STRING
  },
  rosterName: {
    validateStatus: null,
    help: EMPTY_STRING
  }
};
