import { DefaultState } from '~types/state';
import { Pagination, RowsDto } from '~types/dto';

export interface AnyResponse {
  [key: string]: string | unknown;

  responseStatus: string;
  responseId?: string;
  responseTitle?: string;
  responseMessage?: string;
}

export interface AnyRequest extends AnyResponse {
  requestId?: string;
}

export interface JsonResponse extends DefaultState {
  status?: string;
  errorCode?: string;
  errorDescription?: string;
}

export interface PageableResponse extends AnyResponse {
  pagination?: Pagination;
}

export interface RostersResponse extends PageableResponse {
  rows?: RowsDto[];
}
