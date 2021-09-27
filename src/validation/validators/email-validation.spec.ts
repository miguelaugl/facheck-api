import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols'

import { EmailValidation } from './email-validation'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub,
  }
}
describe('Email Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toBeFalsy()
  })
})
