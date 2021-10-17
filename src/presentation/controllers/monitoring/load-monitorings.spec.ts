import { LoadMonitorings } from '@/domain/usecases'

import { LoadMonitoringsController } from './load-monitorings'

class LoadMonitoringsSpy implements LoadMonitorings {
  callsCount = 0

  async load (): Promise<LoadMonitorings.Result> {
    this.callsCount = this.callsCount + 1
    return null
  }
}

type SutTypes = {
  sut: LoadMonitoringsController
  loadMonitoringsSpy: LoadMonitoringsSpy
}

const makeSut = (): SutTypes => {
  const loadMonitoringsSpy = new LoadMonitoringsSpy()
  const sut = new LoadMonitoringsController(loadMonitoringsSpy)
  return {
    sut,
    loadMonitoringsSpy,
  }
}

describe('LoadMonitorings Controller', () => {
  it('should call LoadMonitorings', async () => {
    const { sut, loadMonitoringsSpy } = makeSut()
    await sut.handle({})
    expect(loadMonitoringsSpy.callsCount).toBe(1)
  })
})
