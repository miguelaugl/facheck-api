import { mockAddMonitoringParams } from '@/domain/test'
import { AddMonitoring } from '@/domain/usecases'

import { AddMonitoringController } from './add-monitoring'

describe('AddMonitoring Controller', () => {
  it('should call AddMonitoring with correct values', async () => {
    class AddMonitoringSpy implements AddMonitoring {
      params: AddMonitoring.Params

      async add (params: AddMonitoring.Params): Promise<void> {
        this.params = params
      }
    }
    const addMonitoringSpy = new AddMonitoringSpy()
    const sut = new AddMonitoringController(addMonitoringSpy)
    const httpRequest = {
      body: mockAddMonitoringParams(),
    }
    await sut.handle(httpRequest)
    expect(addMonitoringSpy.params).toEqual(httpRequest.body)
  })
})
