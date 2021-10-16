import { AddMonitoring } from '@/domain/usecases'
import { serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddMonitoringController implements Controller {
  constructor (
    private readonly addMonitoring: AddMonitoring,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addMonitoring.add(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
