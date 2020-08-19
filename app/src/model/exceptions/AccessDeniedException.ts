import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class AccessDeniedException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.ACCESS_DENIED_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const accessDeniedException = (message: string): AccessDeniedException => new AccessDeniedException({
  errorType: Exceptions.ACCESS_DENIED_EXCEPTION,
  message
});
