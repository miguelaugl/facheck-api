import { LoadMonitoringById } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMonitoringByIdController implements Controller {
  constructor (
    private readonly loadMonitoringById: LoadMonitoringById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadMonitoringById.load(httpRequest.params?.monitoringId)
    return null
  }
}
