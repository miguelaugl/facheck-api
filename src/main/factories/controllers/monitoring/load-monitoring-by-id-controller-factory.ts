import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadMonitoringById } from '@/main/factories/usecases'
import { LoadMonitoringByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadMonitoringByIdController = (): Controller => {
  const controller = new LoadMonitoringByIdController(makeDbLoadMonitoringById())
  return makeLogControllerDecorator(controller)
}
