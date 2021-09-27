import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols'

import { EmailValidation } from './email-validation'

describe('Email Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        return true
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new EmailValidation('email', emailValidatorStub)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
})
