import { AddMonitoring } from '@/domain/usecases'
import { noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class AddMonitoringController implements Controller {
  constructor (
    private readonly addMonitoring: AddMonitoring,
    private readonly validation: Validation,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      await this.addMonitoring.add(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
