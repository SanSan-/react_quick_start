import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class TimeoutException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.TIMEOUT_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const timeoutException = (message: string): TimeoutException => new TimeoutException({
  errorType: Exceptions.TIMEOUT_EXCEPTION,
  message
});
