import { AddAccount } from '@/domain/usecases'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockAddAccount, ValidationSpy } from '@/presentation/tests'

import { SignUpController } from './signup'

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationSpy: ValidationSpy
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    ra: 'any_ra',
    course: 'any_course',
    cpf: 'any_cpf',
  },
})

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(addAccountStub, validationSpy)
  return {
    sut,
    addAccountStub,
    validationSpy,
  }
}

describe('SignUp Controller', () => {
  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      ra: 'any_ra',
      course: 'any_course',
      cpf: 'any_cpf',
    })
  })

  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('stack')))
  })

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(true))
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(mockRequest())
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  it('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = new MissingParamError('any_field')
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(error)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(error))
  })
})
