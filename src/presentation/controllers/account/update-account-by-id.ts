import { UpdateAccountById } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateAccountByIdController implements Controller {
  constructor (
    private readonly updateAccountById: UpdateAccountById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.updateAccountById.update(httpRequest.accountId, httpRequest.body)
    return null
  }
}
