import { LoadMonitoringById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMonitoringByIdController implements Controller {
  constructor (
    private readonly loadMonitoringById: LoadMonitoringById,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { monitoringId } = httpRequest.params
      const monitoring = await this.loadMonitoringById.load(monitoringId)
      if (!monitoring) {
        return forbidden(new InvalidParamError('monitoringId'))
      }
      return ok(monitoring)
    } catch (error) {
      return serverError(error)
    }
  }
}
