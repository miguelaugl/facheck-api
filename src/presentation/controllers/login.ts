import { Authentication } from '@/domain/usecases'
import { unauthorized } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const authenticationModel = await this.authentication.auth({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    })
    if (!authenticationModel) {
      return unauthorized()
    }
    return null
  }
}
