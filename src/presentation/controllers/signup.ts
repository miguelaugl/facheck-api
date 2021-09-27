import { AddAccount } from '@/domain/usecases'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { CpfValidator, EmailValidator } from '@/validation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly cpfValidator: CpfValidator,
    private readonly addAccount: AddAccount,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation', 'ra', 'course', 'cpf']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation, cpf, ra, course } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isEmailValid = this.emailValidator.isValid(email)
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const isCpfValid = this.cpfValidator.isValid(cpf)
      if (!isCpfValid) {
        return badRequest(new InvalidParamError('cpf'))
      }
      const account = await this.addAccount.add({
        name,
        course,
        cpf,
        email,
        password,
        ra,
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
