import Exceptions from '~enums/Exceptions';
import { ExceptionType } from '~types/dto';

export default class TransportNoRouteException {
  [key: string]: string;

  constructor (e: ExceptionType) {
    if (e.errorType === Exceptions.TRANSPORT_NO_ROUTE_EXCEPTION) {
      const that = this;
      Object.keys(e).forEach((key) => {
        that[key] = e[key];
      });
    }
  }
}

export const transportNoRouteException = (message: string): TransportNoRouteException => new TransportNoRouteException({
  errorType: Exceptions.TRANSPORT_NO_ROUTE_EXCEPTION,
  message
});
