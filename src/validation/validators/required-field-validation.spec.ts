import { MissingParamError } from '@/presentation/errors'

import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  it('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('email'))
  })
})
