import { Authentication } from '@/domain/usecases'
import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { Validation } from '@/validation/protocols'

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
  validationStub: Validation
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthenticationStub()
  const validationStub = makeValidationStub()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub,
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

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(null)
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new Error()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(error))
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(error))
  })

  it('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok('any_token'))
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })
})
