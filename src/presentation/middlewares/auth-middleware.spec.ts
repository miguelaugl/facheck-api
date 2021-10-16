import { mockAccountModel } from '@/domain/tests'
import { LoadAccountByToken } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'

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
    const accessToken = 'any_token'
    await sut.handle({
      headers: {
        'x-access-token': accessToken,
      },
    })
    expect(loadAccountByTokenSpy.accessToken).toEqual(accessToken)
  })
})
