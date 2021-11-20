enum Backend {
  LOGIN_SUCCESS = '@@backend/login/success',
  LOGIN_ERROR = '@@backend/login/error',

  LOGOUT = '@@backend/logout',
  LOGOUT_SUCCESS = '@@backend/logout/success',
  LOGOUT_ERROR = '@@backend/logout/error',

  PASSWORD_EXPIRED = '@@backend/password/expired',
  CHANGE_PASSWORD_SUCCESS = '@@backend/change_password/success',
  CHANGE_PASSWORD_ERROR = '@@backend/change_password/error',

  GET_TOKEN = '@@backend/get_token',
  GET_TOKEN_SUCCESS = '@@backend/get_token/success',
  GET_TOKEN_ERROR = '@@backend/get_token/error'
}

export default Backend;
