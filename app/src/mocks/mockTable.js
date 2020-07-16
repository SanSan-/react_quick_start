import moment from 'moment';

import { DATE_FORMAT } from '~constants/common';

export const getRows = [
  {
    rowName: 'Alex Franz',
    rowAccount: '12312423543654654',
    rowDate: moment().format(DATE_FORMAT)
  }, {
    rowName: 'Power Wolf',
    rowAccount: '1234564567568787',
    rowDate: moment().format(DATE_FORMAT)
  }, {
    rowName: 'James Collado',
    rowAccount: '15436547456876867',
    rowDate: moment().format(DATE_FORMAT)
  }
];
