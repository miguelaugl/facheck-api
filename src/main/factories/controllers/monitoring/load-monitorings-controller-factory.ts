import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadMonitorings } from '@/main/factories/usecases'
import { LoadMonitoringsController } from '@/presentation/controllers/monitoring/load-monitorings'
import { Controller } from '@/presentation/protocols'

export const makeLoadMonitoringsController = (): Controller => {
  const controller = new LoadMonitoringsController(makeDbLoadMonitorings())
  return makeLogControllerDecorator(controller)
}
