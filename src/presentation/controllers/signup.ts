import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'
import { HttpRequest, HttpResponse } from '../protocols'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
