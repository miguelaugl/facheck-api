import { LoadMonitorings } from '@/domain/usecases'
import { serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadMonitoringsController implements Controller {
  constructor (private readonly loadMonitorings: LoadMonitorings) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadMonitorings.load()
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
