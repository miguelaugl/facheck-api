import { mockAddMonitoringParams } from '@/domain/test'
import { AddMonitoring } from '@/domain/usecases'

import { AddMonitoringController } from './add-monitoring'

class AddMonitoringSpy implements AddMonitoring {
  params: AddMonitoring.Params

  async add (params: AddMonitoring.Params): Promise<void> {
    this.params = params
  }
}

type SutTypes = {
  sut: AddMonitoringController
  addMonitoringSpy: AddMonitoringSpy
}

const makeSut = (): SutTypes => {
  const addMonitoringSpy = new AddMonitoringSpy()
  const sut = new AddMonitoringController(addMonitoringSpy)
  return {
    sut,
    addMonitoringSpy,
  }
}

describe('AddMonitoring Controller', () => {
  it('should call AddMonitoring with correct values', async () => {
    const { sut, addMonitoringSpy } = makeSut()
    const httpRequest = {
      body: mockAddMonitoringParams(),
    }
    await sut.handle(httpRequest)
    expect(addMonitoringSpy.params).toEqual(httpRequest.body)
  })
})
