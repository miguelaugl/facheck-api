import { HttpRequest, HttpResponse, HttpStatusCode } from '../protocols'

export class SignUpController {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new Error('Missing param: name'),
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: new Error('Missing param: email'),
      }
    }
  }
}
