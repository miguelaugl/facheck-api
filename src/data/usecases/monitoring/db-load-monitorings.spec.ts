import { LoadMonitoringsRepository } from '@/data/protocols'
import { mockMonitoringModels } from '@/domain/tests'

import { DbLoadMonitorings } from './db-load-monitorings'

class LoadMonitoringsRepositorySpy implements LoadMonitoringsRepository {
  callsCount = 0
  result = mockMonitoringModels()

  async loadAll (): Promise<LoadMonitoringsRepository.Result> {
    this.callsCount = this.callsCount + 1
    return mockMonitoringModels()
  }
}

describe('DbLoadMonitorings Usecase', () => {
  it('should call LoadMonitoringsRepository', async () => {
    const loadMonitoringsRepositorySpy = new LoadMonitoringsRepositorySpy()
    const sut = new DbLoadMonitorings(loadMonitoringsRepositorySpy)
    await sut.load()
    expect(loadMonitoringsRepositorySpy.callsCount).toBe(1)
  })
})
