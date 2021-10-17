import { AddAccount } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, cpf, ra, course, role } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        course,
        cpf,
        email,
        password,
        ra,
        role,
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
