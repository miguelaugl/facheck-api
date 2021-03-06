import { LoadMonitoringsRepository } from '@/data/protocols'
import { mockDbLoadMonitoringsResult } from '@/data/tests'

import { DbLoadMonitorings } from './db-load-monitorings'

class LoadMonitoringsRepositorySpy implements LoadMonitoringsRepository {
  callsCount = 0
  result = mockDbLoadMonitoringsResult()

  async loadAll (): Promise<LoadMonitoringsRepository.Result> {
    this.callsCount = this.callsCount + 1
    return this.result
  }
}

type SutTypes = {
  sut: DbLoadMonitorings
  loadMonitoringsRepositorySpy: LoadMonitoringsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadMonitoringsRepositorySpy = new LoadMonitoringsRepositorySpy()
  const sut = new DbLoadMonitorings(loadMonitoringsRepositorySpy)
  return {
    sut,
    loadMonitoringsRepositorySpy,
  }
}

describe('DbLoadMonitorings Usecase', () => {
  it('should call LoadMonitoringsRepository', async () => {
    const { sut, loadMonitoringsRepositorySpy } = makeSut()
    await sut.load()
    expect(loadMonitoringsRepositorySpy.callsCount).toBe(1)
  })

  it('should throw if LoadMonitoringsRepository throws', async () => {
    const { sut, loadMonitoringsRepositorySpy } = makeSut()
    jest.spyOn(loadMonitoringsRepositorySpy, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  it('should return a list of monitorings', async () => {
    const { sut, loadMonitoringsRepositorySpy } = makeSut()
    const monitorings = await sut.load()
    expect(monitorings).toEqual(loadMonitoringsRepositorySpy.result)
  })
})
