import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'

import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
