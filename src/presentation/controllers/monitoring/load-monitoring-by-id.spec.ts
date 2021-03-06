
import { mockDbLoadMonitoringsModel } from '@/data/tests'
import { LoadMonitoringById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { serverError, ok, forbidden } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

import { LoadMonitoringByIdController } from './load-monitoring-by-id'

const monitoringModel = mockDbLoadMonitoringsModel()

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

  it('should return 403 if LoadMonitoringById returns null', async () => {
    const { sut, loadMonitoringByIdSpy } = makeSut()
    jest.spyOn(loadMonitoringByIdSpy, 'load').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('monitoringId')))
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(monitoringModel))
  })
})
