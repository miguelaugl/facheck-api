import { mockMonitoringModel } from '@/domain/tests'
import { LoadMonitoringById } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'

import { LoadMonitoringByIdController } from './load-monitoring-by-id'

const monitoringModel = mockMonitoringModel()

class LoadMonitoringByIdSpy implements LoadMonitoringById {
  monitoringId: string
  result = monitoringModel

  async load (monitoringId: string): Promise<LoadMonitoringById.Result> {
    this.monitoringId = monitoringId
    return this.result
  }
}

describe('LoadMonitoringById Controller', () => {
  it('should call LoadMonitoringById with correct id', async () => {
    const loadMonitoringByIdSpy = new LoadMonitoringByIdSpy()
    const sut = new LoadMonitoringByIdController(loadMonitoringByIdSpy)
    const httpRequest: HttpRequest = {
      params: {
        monitoringId: monitoringModel.id,
      },
    }
    await sut.handle(httpRequest)
    expect(loadMonitoringByIdSpy.monitoringId).toBe(monitoringModel.id)
  })
})
