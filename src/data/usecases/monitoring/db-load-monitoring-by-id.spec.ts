import { LoadMonitoringByIdRepository } from '@/data/protocols'
import { mockMonitoringModel } from '@/domain/tests'

import { DbLoadMonitoringById } from './db-load-monitoring-by-id'

class LoadMonitoringByIdRepositorySpy implements LoadMonitoringByIdRepository {
  monitoringId: string
  result = mockMonitoringModel()

  async loadById (monitoringId: string): Promise<LoadMonitoringByIdRepository.Result> {
    this.monitoringId = monitoringId
    return this.result
  }
}

describe('DbLoadMonitoringById Usecase', () => {
  it('should call LoadMonitoringByIdRepository with correct id', async () => {
    const loadMonitoringByIdRepositorySpy = new LoadMonitoringByIdRepositorySpy()
    const sut = new DbLoadMonitoringById(loadMonitoringByIdRepositorySpy)
    const monitoringId = 'any_id'
    await sut.load(monitoringId)
    expect(loadMonitoringByIdRepositorySpy.monitoringId).toBe(monitoringId)
  })
})
