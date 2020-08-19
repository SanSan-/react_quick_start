import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class UnexpectedException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.UNEXPECTED_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const unexpectedException = (message: string): UnexpectedException => new UnexpectedException({
  errorType: Exceptions.UNEXPECTED_EXCEPTION,
  message
});
