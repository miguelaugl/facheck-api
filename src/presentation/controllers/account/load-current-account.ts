import { LoadAccountById } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadCurrentAccountController implements Controller {
  constructor (
    private readonly loadAccountById: LoadAccountById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const account = await this.loadAccountById.load(httpRequest.accountId)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
