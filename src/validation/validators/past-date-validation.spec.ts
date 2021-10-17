import { InvalidParamError } from '@/presentation/errors'

import { PastDateValidation } from './past-date-validation'

const makeSut = (fieldName = 'date'): PastDateValidation => {
  return new PastDateValidation(fieldName)
}

describe('PastDate Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const fieldName = 'date'
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: 'any_date' })
    expect(error).toEqual(new InvalidParamError(fieldName))
  })
})
