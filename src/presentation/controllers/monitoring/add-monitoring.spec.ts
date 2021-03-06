import { mockAddMonitoringParams } from '@/domain/tests'
import { AddMonitoring } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { ValidationSpy } from '@/presentation/tests'

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
  validationSpy: ValidationSpy
}

const addMonitoringsParams = mockAddMonitoringParams()

const mockRequest = (): HttpRequest => ({
  accountId: addMonitoringsParams.monitorId,
  body: {
    subject: addMonitoringsParams.subject,
    weekday: addMonitoringsParams.weekday,
    initHour: addMonitoringsParams.initHour,
    endHour: addMonitoringsParams.endHour,
    room: addMonitoringsParams.room,
  },
})

const makeSut = (): SutTypes => {
  const addMonitoringSpy = new AddMonitoringSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddMonitoringController(addMonitoringSpy, validationSpy)
  return {
    sut,
    addMonitoringSpy,
    validationSpy,
  }
}

describe('AddMonitoring Controller', () => {
  it('should call AddMonitoring with correct values', async () => {
    const { sut, addMonitoringSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addMonitoringSpy.params).toEqual(addMonitoringsParams)
  })

  it('should return 500 if AddSurvey throws', async () => {
    const { sut, addMonitoringSpy } = makeSut()
    const error = new Error()
    jest.spyOn(addMonitoringSpy, 'add').mockImplementationOnce(() => { throw error })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(error))
  })

  it('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  it('should return 401 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new MissingParamError('any_field')
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(badRequest(error))
  })
})
