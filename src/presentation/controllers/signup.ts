import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'
import { HttpRequest, HttpResponse } from '../protocols'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
