import { Authentication } from '@/domain/usecases'

import { LoginController } from './login'

describe('Login Controller', () => {
  it('should call Authentication with correct values', async () => {
    class AuthenticationStub implements Authentication {
      async auth (params: Authentication.Params): Promise<Authentication.Result> {
        return 'any_token'
      }
    }
    const authencationStub = new AuthenticationStub()
    const sut = new LoginController(authencationStub)
    const authSpy = jest.spyOn(authencationStub, 'auth')
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
