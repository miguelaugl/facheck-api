import { mockMonitoringModel } from '@/domain/tests'
import { LoadMonitoringById } from '@/domain/usecases'
import { serverError } from '@/presentation/helpers'
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

type SutTypes = {
  sut: LoadMonitoringByIdController
  loadMonitoringByIdSpy: LoadMonitoringByIdSpy
}

const makeSut = (): SutTypes => {
  const loadMonitoringByIdSpy = new LoadMonitoringByIdSpy()
  const sut = new LoadMonitoringByIdController(loadMonitoringByIdSpy)
  return {
    sut,
    loadMonitoringByIdSpy,
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    monitoringId: monitoringModel.id,
  },
})

describe('LoadMonitoringById Controller', () => {
  it('should call LoadMonitoringById with correct id', async () => {
    const { sut, loadMonitoringByIdSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(loadMonitoringByIdSpy.monitoringId).toBe(monitoringModel.id)
  })

  it('should return 500 if LoadMonitoringById throws', async () => {
    const { sut, loadMonitoringByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadMonitoringByIdSpy, 'load').mockReturnValueOnce(Promise.reject(error))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
