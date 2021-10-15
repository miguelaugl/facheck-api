export enum HttpStatusCode {
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  OK = 200,
  UNAUTHORIZED = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body: any
}

export type HttpRequest = {
  body?: any
}
