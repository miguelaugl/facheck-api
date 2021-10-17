import { LoadMonitorings } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMonitoringsController implements Controller {
  constructor (private readonly loadMonitorings: LoadMonitorings) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const monitorings = await this.loadMonitorings.load()
      if (!monitorings.length) {
        return noContent()
      }
      return ok(monitorings)
    } catch (error) {
      return serverError(error)
    }
  }
}
