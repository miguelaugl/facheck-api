import { HttpResponse, HttpStatusCode } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
})
