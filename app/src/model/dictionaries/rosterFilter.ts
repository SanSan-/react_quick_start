import Thing from '~types/classes/Thing';
import { EMPTY_STRING } from '~const/common';
import { RosterFilterType, RosterType, ValidatorType } from '~types/state';

export const statusFilter = [
  { key: '1', label: 'Status 1' },
  { key: '2', label: 'Status 2' },
  { key: '3', label: 'Status 3' },
  { key: '4', label: 'Status 4' },
  { key: '5', label: 'Status 5' },
  { key: '6', label: 'Status 6' },
  { key: '7', label: 'Status 7' },
  { key: '8', label: 'Status 8' }
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
