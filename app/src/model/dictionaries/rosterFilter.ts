import Thing from '~types/classes/Thing';
import { EMPTY_STRING } from '~const/common';
import { RosterFilter, RosterType, Validator } from '~types/filters';
import { LabeledValue } from 'antd/lib/select';
import Statuses from '~types/classes/Statuses';

export const statusFilter: LabeledValue[] = [
  { key: '1', label: 'Status 1', value: '1' },
  { key: '2', label: 'Status 2', value: '2' },
  { key: '3', label: 'Status 3', value: '3' },
  { key: '4', label: 'Status 4', value: '4' },
  { key: '5', label: 'Status 5', value: '5' },
  { key: '6', label: 'Status 6', value: '6' },
  { key: '7', label: 'Status 7', value: '7' },
  { key: '8', label: 'Status 8', value: '8' }
];

export const statusesMetaFilter: Statuses[] = [
  new Statuses('Status Group 1', [
    statusFilter[0],
    statusFilter[1],
    statusFilter[2],
    statusFilter[3]
  ]),
  new Statuses('Status Group 2', [
    statusFilter[4],
    statusFilter[5],
    statusFilter[6],
    statusFilter[7]
  ])
];

export const thingsFilter = [
  new Thing('all', 'All'),
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

export const defaultFilter: RosterFilter = {
  dateStart: null,
  dateEnd: null,
  rosterNumber: null,
  rosterType: typesFilter[0],
  isRosterValidation: null,
  rosterName: null,
  selected: [],
  otherThing: []
};

export const defaultValidators: Record<string, Validator> = {
  rosterNumber: {
    validateStatus: null,
    help: EMPTY_STRING
  },
  rosterName: {
    validateStatus: null,
    help: EMPTY_STRING
  }
};
