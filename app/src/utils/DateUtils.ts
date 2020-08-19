import dayjs, { Dayjs } from 'dayjs';

export const getValidDayjs = (str: string, format: string): Dayjs =>
  dayjs(str, format).isValid() ? dayjs(str, format) : null;
