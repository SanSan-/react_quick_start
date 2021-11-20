import { AuthContextAction } from '~types/action';
import { Either } from '@sweet-monads/either';
import { ErrorType } from '~types/dto';
import { GeneralSettingsResponse, PersonalSettingsResponse } from '~types/response';
import ActionType from '~enums/AuthContext';
import { wrapFetchJson } from '~actions/backend/fetch';
import { Settings } from '~enums/Routes';

export const loadUser = ({ username, roles, projects }: PersonalSettingsResponse):
  AuthContextAction => ({
  type: ActionType.USER_LOAD_SUCCESS,
  context: { username, roles, projects }
});

export const loadGeneralSettings = ({
  apiUrl,
  authMode,
  authUrl,
  logoutUrl,
  version,
  engineAdminUrl
}: GeneralSettingsResponse): AuthContextAction =>
  ({
    type: ActionType.GENERAL_SETTINGS_LOAD_SUCCESS,
    context: { apiUrl, authMode, authUrl, logoutUrl, version, engineAdminUrl }
  });

export const loadUrl = (isClient: boolean): AuthContextAction => ({
  type: ActionType.URL_LOAD_SUCCESS, context: {
    url: isClient ? window.location.origin : null
  }
});

export const clearAuthContext = (): AuthContextAction => ({ type: ActionType.CLEAR });

export const getGeneralSettings = async (): Promise<Either<ErrorType, GeneralSettingsResponse>> =>
  await wrapFetchJson<GeneralSettingsResponse>(Settings.GENERAL);

export const getUser = async (): Promise<Either<ErrorType, PersonalSettingsResponse>> =>
  await wrapFetchJson<PersonalSettingsResponse>(Settings.PERSONAL);
