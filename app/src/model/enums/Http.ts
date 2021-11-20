export enum ResponseStatus {
  _200 = 200,
  _299 = 299,
  _400 = 400,
  _401 = 401,
  _403 = 403,
  _404 = 404,
  _599 = 599
}

export enum Headers {
  CONTENT_LENGTH = 'Content-Length',
  CONTENT_TYPE = 'Content-Type',
  CONTENT_DISPOSITION = 'Content-Disposition',
  ATTACHMENT_FILE = 'data:attachment/file;',
  FILENAME = 'filename=',
  BEARER = 'Bearer'
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  HEAD = 'HEAD'
}

export enum Credentials {
  SAME_ORIGIN = 'same-origin'
}

export enum ContentType {
  HTML = 'text/html',
  PLAIN = 'text/plain;charset=utf-8',
  JSON = 'application/json;charset=utf=8',
  OCTET_STREAM = 'application/octet-stream',
  URL_ENCODED_UTF_8 = 'application/x-www-form-urlencoded;charset=utf-8'
}

export enum Elements {
  IFRAME = 'iframe',
  TEXTAREA = 'textarea'
}

export enum Document {
  COMMAND_COPY = 'copy'
}

export enum DispositionType {
  ATTACHMENT = 'attachment'
}
