import { InvalidParamError } from '@/presentation/errors'

import { PastDateValidation } from './past-date-validation'

describe('PastDate Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const fieldName = 'date'
    const sut = new PastDateValidation(fieldName)
    const error = sut.validate({ [fieldName]: 'any_date' })
    expect(error).toEqual(new InvalidParamError(fieldName))
  })
})
