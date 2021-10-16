import { AddMonitoring } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddMonitoringController implements Controller {
  constructor (
    private readonly addMonitoring: AddMonitoring,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addMonitoring.add(httpRequest.body)
    return null
  }
}
