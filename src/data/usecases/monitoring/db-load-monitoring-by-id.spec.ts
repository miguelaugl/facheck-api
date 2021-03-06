import { LoadMonitoringByIdRepository } from '@/data/protocols'
import { mockDbLoadMonitoringsModel } from '@/data/tests'

import { DbLoadMonitoringById } from './db-load-monitoring-by-id'

class LoadMonitoringByIdRepositorySpy implements LoadMonitoringByIdRepository {
  monitoringId: string
  result = mockDbLoadMonitoringsModel()

  async loadById (monitoringId: string): Promise<LoadMonitoringByIdRepository.Result> {
    this.monitoringId = monitoringId
    return this.result
  }
}

type SutTypes = {
  sut: DbLoadMonitoringById
  loadMonitoringByIdRepositorySpy: LoadMonitoringByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadMonitoringByIdRepositorySpy = new LoadMonitoringByIdRepositorySpy()
  const sut = new DbLoadMonitoringById(loadMonitoringByIdRepositorySpy)
  return {
    sut,
    loadMonitoringByIdRepositorySpy,
  }
}

describe('DbLoadMonitoringById Usecase', () => {
  it('should call LoadMonitoringByIdRepositorySpy with correct id', async () => {
    const { sut, loadMonitoringByIdRepositorySpy } = makeSut()
    const monitoringId = 'any_id'
    await sut.load(monitoringId)
    expect(loadMonitoringByIdRepositorySpy.monitoringId).toBe(monitoringId)
  })

  it('should throw if LoadMonitoringByIdRepositorySpy throws', async () => {
    const { sut, loadMonitoringByIdRepositorySpy } = makeSut()
    jest.spyOn(loadMonitoringByIdRepositorySpy, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('should return a monitoring on success', async () => {
    const { sut, loadMonitoringByIdRepositorySpy } = makeSut()
    const monitoring = await sut.load('any_id')
    expect(monitoring).toEqual(loadMonitoringByIdRepositorySpy.result)
  })
})
