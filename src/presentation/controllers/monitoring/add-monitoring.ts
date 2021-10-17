import { AddMonitoring } from '@/domain/usecases'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class AddMonitoringController implements Controller {
  constructor (
    private readonly addMonitoring: AddMonitoring,
    private readonly validation: Validation,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      await this.addMonitoring.add(httpRequest.body)
      return noContent()
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
