import { UpdateAccountById } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateAccountByIdController implements Controller {
  constructor (
    private readonly updateAccountById: UpdateAccountById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const account = await this.updateAccountById.update(httpRequest.accountId, httpRequest.body)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
