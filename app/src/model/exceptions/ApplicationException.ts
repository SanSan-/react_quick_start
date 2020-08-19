import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class ApplicationException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.APPLICATION_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const applicationException = (message: string): ApplicationException => new ApplicationException({
  errorType: Exceptions.APPLICATION_EXCEPTION,
  message
});
