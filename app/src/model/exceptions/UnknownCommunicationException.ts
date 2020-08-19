import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class UnknownCommunicationException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.UNKNOWN_COMMUNICATION_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const unknownCommunicationException = (message: string): UnknownCommunicationException =>
  new UnknownCommunicationException({
    errorType: Exceptions.UNKNOWN_COMMUNICATION_EXCEPTION,
    message
  });
