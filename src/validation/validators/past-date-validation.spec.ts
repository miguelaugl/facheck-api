import { InvalidParamError } from '@/presentation/errors'

import { PastDateValidation } from './past-date-validation'

const ONE_DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24

const makeSut = (fieldName = 'date'): PastDateValidation => {
  return new PastDateValidation(fieldName)
}

describe('PastDate Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const fieldName = 'date'
    const yesterday = new Date((new Date()).valueOf() - ONE_DAY_IN_MILISECONDS)
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: yesterday })
    expect(error).toEqual(new InvalidParamError(fieldName))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ date: new Date() })
    expect(error).toBeFalsy()
  })
})
