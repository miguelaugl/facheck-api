import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse, HttpStatusCode } from '../protocols'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new MissingParamError('name'),
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new MissingParamError('email'),
      }
    }
  }
}
