import { LoadMonitorings } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMonitoringsController implements Controller {
  constructor (private readonly loadMonitorings: LoadMonitorings) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadMonitorings.load()
    return null
  }
}
