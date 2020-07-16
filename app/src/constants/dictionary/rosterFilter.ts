import * as Immutable from 'immutable';
import Status from '~dictionaries/Status';
import Thing from '~dictionaries/Thing';
import { EMPTY_STRING } from '~const/common';

export const statusFilter = Immutable.fromJS([
  new Status('1', 'Status 1'),
  new Status('2', 'Status 2'),
  new Status('3', 'Status 3'),
  new Status('4', 'Status 4'),
  new Status('5', 'Status 5'),
  new Status('6', 'Status 6'),
  new Status('7', 'Status 7'),
  new Status('8', 'Status 8')
]);

export const thingsFilter = Immutable.fromJS([
  new Thing('all', 'All', []),
  new Thing('sec1', 'Section 1', ['0', '3']),
  new Thing('th0', 'Thing 0', ['0']),
  new Thing('th3', 'Thing 3', ['3']),
  new Thing('sec2', 'Section 2', ['4', '5']),
  new Thing('th4', 'Thing 4', ['4']),
  new Thing('th5', 'Thing 5', ['5'])
]);

export const typesFilter = Immutable.fromJS([
  'all',
  'first',
  'second'
]);

export const defaultFilter = Immutable.fromJS({
  dateStart: null,
  dateEnd: null,
  rosterNumber: null,
  rosterType: typesFilter.toJS()[0],
  isRosterValidation: null,
  rosterName: null,
  otherStatus: [],
  otherThing: thingsFilter.toJS()[0]
});

export const defaultValidators = Immutable.fromJS({
  rosterNumber: {
    validateStatus: null,
    help: EMPTY_STRING
  },
  rosterName: {
    validateStatus: null,
    help: EMPTY_STRING
  }
});
