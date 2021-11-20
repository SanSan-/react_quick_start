export enum ControllerPath {
  DOWNLOAD = '/download/',
  INVOKE = '/invoke/'
}

export enum AuthToken {
  GET_BY_MODULE_ID = '/csrfToken/get?moduleId=',
  GET_ACCESS_TOKEN = '/user/auth/token',
  GET_REFRESH_TOKEN = '/user/auth/refresh',
  API_URL = '/user',
}

export enum Auth {
  LOGIN = '/login',
  LOGOUT = '/logout',
  CHANGE_PASSWORD = '/changePassword'
}

export enum Settings {
  GENERAL = '/settings/general',
  PERSONAL = '/settings/personal'
}
