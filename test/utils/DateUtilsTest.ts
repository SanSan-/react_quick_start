import { getValidDayjs } from '~utils/DateUtils';

describe('function getValidDayjs', () => {

  test('should return valid Dayjs', () => {
    expect(getValidDayjs('09.09.2020', 'dd.mm.yyyy').isValid()).toBeTruthy();
  });

  test('should return invalid Dayjs', () => {
    expect(getValidDayjs('9 september of 2020', 'dd.mm.yyyy')).toBeNull();
  });

});
