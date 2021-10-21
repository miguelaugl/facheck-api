import { MissingParamError } from '@/presentation/errors'

import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('email')
}

describe('RequiredField Validation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('email'))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toBeFalsy()
  })

  it('should not return if receives zero ', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 0 })
    expect(error).toBeFalsy()
  })
})
