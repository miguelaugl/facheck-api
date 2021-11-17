import { UpdateAccountById } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateAccountByIdController implements Controller {
  constructor (
    private readonly updateAccountById: UpdateAccountById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        email,
        ra,
        course,
        cpf,
      } = httpRequest.body
      const account = await this.updateAccountById.update(httpRequest.accountId, {
        name,
        email,
        ra,
        course,
        cpf,
      })
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
