import { InvalidParamError } from '@/presentation/errors'

import { EmailValidation } from './email-validation'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidation('email')
  return {
    sut,
  }
}

describe('Email Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: 'invalid_email' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toBeFalsy()
  })
})
