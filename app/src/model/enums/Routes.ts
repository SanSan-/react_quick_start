export enum ControllerPath {
  DOWNLOAD = '/download/',
  INVOKE = '/invoke/',
  INVOKE_ASYNC = '/invokeAsync/'
}

export enum Push {
  FIND_BY_NOTIFICATION_ID = '/push/findById?notificationId=',
  FIND_BY_SESSION_ID = '/push/findBySession?sessionId=',
  NEW_SESSION = '/push/newSession'
}

export enum CsrfToken {
  GET_BY_MODULE_ID = '/csrfToken/get?moduleId='
}

export enum Auth {
  LOGIN = '/login',
  LOGOUT = '/logout',
  CHANGE_PASSWORD = '/changePassword'
}

export enum InvokeAsync {
  REPLY = '/invokeAsync/reply',
  ERROR = '/invokeAsync/error'
}

export enum Links {
  ROSTER_DETAIL = '#/app/roster/detail?objectId='
}
