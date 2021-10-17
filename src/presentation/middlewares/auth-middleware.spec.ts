import { mockAccountModel } from '@/domain/tests'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'

import { AuthMiddleware } from './auth-middleware'

class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  role?: string
  result = mockAccountModel()

  async loadAccountByToken (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
})

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy, role)
  return {
    sut,
    loadAccountByTokenSpy,
  }
}

describe('Auth Middleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should call LoadAccountByToken with correct values', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    await sut.handle(mockRequest())
    expect(loadAccountByTokenSpy.accessToken).toEqual('any_token')
    expect(loadAccountByTokenSpy.role).toEqual(role)
  })

  it('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'loadAccountByToken').mockReturnValueOnce(null)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const account = mockAccountModel()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accountId: account.id }))
  })

  it('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const error = new Error()
    jest.spyOn(loadAccountByTokenSpy, 'loadAccountByToken').mockReturnValueOnce(Promise.reject(error))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
