import { mockAccountModel } from '@/domain/tests'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok } from '@/presentation/helpers'

import { HttpRequest } from '../protocols'
import { AuthMiddleware } from './auth-middleware'

class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string
  result = mockAccountModel()

  async loadAccountByToken (accessToken: string): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
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

const makeSut = (): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy)
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

  it('should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(loadAccountByTokenSpy.accessToken).toEqual('any_token')
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
})
