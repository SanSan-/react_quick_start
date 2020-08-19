import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class JsonParsingException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.JSON_PARSING_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const jsonParsingException = (message: string): JsonParsingException => new JsonParsingException({
  errorType: Exceptions.JSON_PARSING_EXCEPTION,
  message
});
