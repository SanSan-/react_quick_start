const dayjs = require('dayjs');

const DATE_FORMAT = 'DD.MM.YYYY';

const getRows = {
  responseStatus: 'SUCCESS',
  rows: [
    {
      rowName: 'Alex Franz',
      rowAccount: '12312423543654654',
      rowDate: dayjs().format(DATE_FORMAT)
    },
    {
      rowName: 'Power Wolf',
      rowAccount: '1234564567568787',
      rowDate: dayjs
      ().format(DATE_FORMAT)
    },
    {
      rowName: 'James Collado',
      rowAccount: '15436547456876867',
      rowDate: dayjs().format(DATE_FORMAT)
    }
  ]
};

module.exports = { getRows };
