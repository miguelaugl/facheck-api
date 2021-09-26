export enum HttpStatusCode {
  BAD_REQUEST = 400,
  SERVER_ERROR = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body: any
}

export type HttpRequest = {
  body?: any
}
