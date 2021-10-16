import { LoadAccountByToken } from '@/domain/usecases'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'

import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.loadAccountByToken(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
