import { AddMonitoringRepository } from '@/data/protocols'
import { mockAddMonitoringParams } from '@/domain/tests'

import { DbAddMonitoring } from './db-add-monitoring'

class AddMonitoringRepositorySpy implements AddMonitoringRepository {
  params: AddMonitoringRepository.Params

  async add (params: AddMonitoringRepository.Params): Promise<void> {
    this.params = params
  }
}

type SutTypes = {
  sut: DbAddMonitoring
  addMonitoringRepositorySpy: AddMonitoringRepositorySpy
}

const makeSut = (): SutTypes => {
  const addMonitoringRepositorySpy = new AddMonitoringRepositorySpy()
  const sut = new DbAddMonitoring(addMonitoringRepositorySpy)
  return {
    sut,
    addMonitoringRepositorySpy,
  }
}

describe('DbAddMonitoring Usecase', () => {
  it('should call AddMonitoringRepository with correct values', async () => {
    const { sut, addMonitoringRepositorySpy } = makeSut()
    const addMonitoringParams = mockAddMonitoringParams()
    await sut.add(addMonitoringParams)
    expect(addMonitoringRepositorySpy.params).toEqual(addMonitoringParams)
  })

  it('should throw if AddMonitoringRepository throws', async () => {
    const { sut, addMonitoringRepositorySpy } = makeSut()
    jest.spyOn(addMonitoringRepositorySpy, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(mockAddMonitoringParams())
    await expect(promise).rejects.toThrow()
  })
})
