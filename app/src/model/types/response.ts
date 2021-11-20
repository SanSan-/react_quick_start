import { DefaultState } from '~types/state';
import { Pagination, RowsDto } from '~types/dto';
import AuthMode from '~enums/AuthMode';

export interface AnyResponse {
  [key: string]: string | unknown;

  responseStatus?: string;
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

export interface GeneralSettingsResponse extends DefaultState {
  authMode?: AuthMode;
  version?: string;
  logoutUrl?: string;
  authUrl?: string;
  apiUrl?: string;
  engineAdminUrl?: string;
}

export interface PersonalSettingsResponse extends DefaultState {
  username?: string;
  roles?: string[];
  projects?: string[];
}

export interface PageableResponse extends AnyResponse {
  pagination?: Pagination;
}

export interface RostersResponse extends PageableResponse {
  rows?: RowsDto[];
}

export type UserRightsResponse = string[] | AnyResponse;

export interface UserInfoResponse extends AnyResponse {
  version?: string;
  login?: string;
  roles?: string;
  ip?: string;
  name?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
}

export type EndpointResponse = string[] | AnyResponse;

export interface ReportResponse extends AnyResponse {
  data?: number[];
  fileName?: string;
}

export interface JwtResponse extends AnyResponse {
  exp: number;
}
