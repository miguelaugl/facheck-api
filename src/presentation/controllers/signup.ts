import { EmailValidator } from '@/validation/protocols'

import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { badRequest } from '../helpers'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: new ServerError(),
      }
    }
  }
}
