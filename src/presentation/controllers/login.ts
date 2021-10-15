import { Authentication } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.authentication.auth({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    })
    return null
  }
}
