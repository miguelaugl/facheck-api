import { Authentication } from '@/domain/usecases'

import { LoginController } from './login'

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (params: Authentication.Params): Promise<Authentication.Result> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(authenticationStub)
  return {
    sut,
    authenticationStub,
  }
}

describe('Login Controller', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })
})
