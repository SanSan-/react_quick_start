import { ContentType, Credentials, Headers, Method } from '~enums/Http';
import { Either, left, right } from '@sweet-monads/either';
import TimeoutException, { timeoutException } from '~exceptions/TimeoutException';
import { EMPTY_STRING } from '~const/common';
import JsonParsingException, { jsonParsingException } from '~exceptions/JsonParsingException';
import { JSON_PARSING_ERROR } from '~const/log';
import UnknownCommunicationException, {
  unknownCommunicationException
} from '~exceptions/UnknownCommunicationException';
import { ExceptionType } from '~types/dto';

const initRequestDetail: RequestInit = {
  credentials: Credentials.SAME_ORIGIN,
  headers: {
    Accept: ContentType.JSON,
    [Headers.CONTENT_TYPE]: ContentType.URL_ENCODED_UTF_8
  }
};

export const wrapFetch = async (input: RequestInfo, init: RequestInit): Promise<Either<TimeoutException, Response>> => {
  try {
    const data = await fetch(input, init);
    return right(data);
  } catch (e) {
    return left(timeoutException(e instanceof Error ? e.message : JSON.stringify(e)));
  }
};

export const fetchGet = async (
  service: string,
  request: string = EMPTY_STRING
): Promise<Either<TimeoutException, Response>> => await wrapFetch(
  `${SERVER_PATH}${service}${request}`,
  {
    ...initRequestDetail,
    method: Method.GET
  }
);

export const fetchPost = async (
  endpoint: string,
  body: string = EMPTY_STRING
): Promise<Either<TimeoutException, Response>> => await wrapFetch(
  `${SERVER_PATH}${endpoint}`,
  {
    ...initRequestDetail,
    method: Method.POST,
    body
  }
);

export const wrapJson = async <T> (response: Response): Promise<Either<JsonParsingException, T>> => {
  try {
    const json = await response.json() as T;
    return right(json);
  } catch (e) {
    return left(jsonParsingException(JSON_PARSING_ERROR));
  }
};

export const wrapFetchJson = async <T> (service: string, request: string = EMPTY_STRING):
  Promise<Either<UnknownCommunicationException, T>> => {
  const answer = await fetchGet(service, request);
  return answer.mapLeft((e: ExceptionType) => unknownCommunicationException(e.message))
    .asyncChain(async (response: Response): Promise<Either<JsonParsingException, T>> => await wrapJson(response));
};
