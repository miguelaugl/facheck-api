import { LoadMonitoringById } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMonitoringByIdController implements Controller {
  constructor (
    private readonly loadMonitoringById: LoadMonitoringById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const monitoring = await this.loadMonitoringById.load(httpRequest.params?.monitoringId)
      return ok(monitoring)
    } catch (error) {
      return serverError(error)
    }
  }
}
