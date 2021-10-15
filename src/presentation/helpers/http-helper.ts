import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse, HttpStatusCode } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: error,
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: new ServerError(error.stack),
})

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
})

export const unauthorized = (): HttpResponse => ({
  statusCode: HttpStatusCode.UNAUTHORIZED,
  body: new UnauthorizedError(),
})
