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
      const { subject, weekday, initHour, endHour, room } = httpRequest.body
      const monitorId = httpRequest.accountId
      await this.addMonitoring.add({
        monitorId,
        subject,
        weekday,
        initHour,
        endHour,
        room,
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
